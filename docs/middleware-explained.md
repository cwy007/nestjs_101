# NestJS Middleware 学习指南

本项目演示了 NestJS 中三种中间件模式：**类中间件**、**函数中间件** 和 **全局中间件**。

## 1. 类中间件（Class Middleware）

> 文件：`src/logger.middleware.ts`

实现 `NestMiddleware` 接口的 `@Injectable()` 类，可以使用依赖注入。

```typescript
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      console.log(
        `[${req.method}] ${req.originalUrl} → ${res.statusCode} (${Date.now() - start}ms)`,
      );
    });
    next();
  }
}
```

**特点**：

- 支持依赖注入（可注入其他 Service）
- 通过 `MiddlewareConsumer` 在模块中注册
- 适合需要访问 NestJS DI 容器的场景（如注入 Logger Service）

**注册方式**（在 `AppModule.configure()` 中）：

```typescript
consumer.apply(LoggerMiddleware).forRoutes('*');
```

---

## 2. 函数中间件（Functional Middleware）

> 文件：`src/auth-check.middleware.ts`

普通函数，签名为 `(req, res, next) => void`，更加简洁。

```typescript
export function authCheckMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.headers['authorization']) {
    res.status(401).json({ message: 'Authorization header is missing' });
    return;
  }
  next();
}
```

**特点**：

- 不支持依赖注入
- 代码更简洁，适合简单逻辑
- 同样通过 `MiddlewareConsumer` 注册

**注册方式**（按路由和方法精确绑定）：

```typescript
consumer
  .apply(authCheckMiddleware)
  .forRoutes(
    { path: 'users', method: RequestMethod.POST },
    { path: 'users/:id', method: RequestMethod.PUT },
    { path: 'users/:id', method: RequestMethod.DELETE },
  );
```

---

## 3. 全局中间件（Global Middleware）

> 文件：`src/main.ts`

通过 `app.use()` 在 `bootstrap()` 中直接注册，作用于所有请求。

```typescript
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Request-Id', randomUUID());
  next();
});
```

**特点**：

- 在 NestJS DI 系统之外运行
- 无法注入 Provider
- 最先执行（在所有 NestJS 中间件之前）
- 适合基础设施级需求（请求 ID、CORS、安全头等）

---

## 三种模式对比

| 特性       | 类中间件             | 函数中间件           | 全局中间件 |
| ---------- | -------------------- | -------------------- | ---------- |
| 依赖注入   | ✅                   | ❌                   | ❌         |
| 路由级控制 | ✅                   | ✅                   | ❌（全局） |
| 注册位置   | `Module.configure()` | `Module.configure()` | `main.ts`  |
| 适用场景   | 复杂逻辑、需注入服务 | 简单逻辑             | 基础设施级 |

## 如何选择？

- **需要注入其他服务**（如 Logger、Config）→ 使用类中间件
- **逻辑简单，无外部依赖** → 使用函数中间件
- **所有请求都需要，且不依赖 DI** → 使用全局中间件

## 相关概念

NestJS 还提供了功能类似但更强大的机制：

- **Guards** — 用于权限和认证（可访问 `ExecutionContext`）
- **Interceptors** — 用于请求/响应转换、日志、缓存
- **Pipes** — 用于数据验证和转换

中间件最接近 Express 原生中间件，适合不需要 NestJS 执行上下文的场景。

# @Injectable() 装饰器详解

`@Injectable()` 是 NestJS 中最核心的装饰器之一。本文将深入解析它的工作原理。

---

## 1. 如何理解 @Injectable()

`@Injectable()` 是一个**类装饰器**，它告诉 NestJS：

> "这个类可以被依赖注入容器管理，可以作为依赖被注入到其他类中"

```typescript
@Injectable()
export class AppService {
  // NestJS 可以：
  // 1. 创建这个类的实例
  // 2. 管理它的生命周期
  // 3. 把它注入到需要它的地方
}
```

**核心原理**：

- 装饰器在**编译时**给类附加元数据
- NestJS 的 IoC 容器在**运行时**读取这些元数据
- 根据元数据自动创建实例并注入依赖

---

## 2. 元数据内容

`@Injectable()` 装饰器会附加以下元数据：

| 元数据 Key | 说明 |
| ----------- | ------ |
| `__injectable__: true` | NestJS 标记，表示该类可被 IoC 容器管理 |
| `scope:options` | 作用域选项（单例、请求级、瞬态） |
| `design:paramtypes` | **最关键！** 构造函数参数的类型数组 |

---

## 3. 如何查看元数据

### 方法一：使用脚本查看

项目中的 `scripts/inspect-metadata.ts` 脚本可以查看元数据：

```bash
npx ts-node scripts/inspect-metadata.ts
```

### 方法二：手动查看代码

```typescript
import 'reflect-metadata';
import { Injectable } from '@nestjs/common';

@Injectable()
class LoggerService {
  log(msg: string) { console.log(msg); }
}

@Injectable()
class UserService {
  constructor(private logger: LoggerService) {}
}

// 查看元数据
console.log(Reflect.getMetadata('__injectable__', UserService));
// 输出: true

console.log(Reflect.getMetadata('design:paramtypes', UserService));
// 输出: [ [class LoggerService] ]
```

### 运行结果示例

```txt
============================================================
📦 LoggerService 的元数据:
============================================================
  __injectable__: true
  所有元数据 keys: [ '__injectable__', 'scope:options' ]

============================================================
📦 UserService 的元数据:
============================================================
  design:paramtypes: [ [class LoggerService] ]
  __injectable__: true

  🔑 构造函数参数类型 (design:paramtypes):
     参数 0: LoggerService
```

---

## 4. 依赖注入的核心机制

`design:paramtypes` 是依赖注入的关键：

```txt
UserService 的 design:paramtypes: [ [class LoggerService] ]
                                      ↑
                            NestJS 读取这个，知道要注入 LoggerService
```

### 依赖注入流程

```txt
1. @Injectable() 装饰器
   ↓ 标记 __injectable__: true

2. TypeScript 编译器 (emitDecoratorMetadata: true)
   ↓ 自动生成 design:paramtypes 元数据

3. NestJS IoC 容器启动
   ↓ 读取 design:paramtypes
   ↓ 发现 UserService 依赖 LoggerService
   ↓ 先创建 LoggerService 实例
   ↓ 再创建 UserService，注入 LoggerService

4. 完成依赖注入！
```

---

## 5. tsconfig.json 中的关键配置

要让元数据机制工作，必须在 `tsconfig.json` 中启用以下配置：

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,  // 生成 design:* 元数据
    "experimentalDecorators": true   // 启用装饰器语法
  }
}
```

---

## 6. Reflect API 与 reflect-metadata 详解

### 关键区别

| API 来源 | 是否原生 | 说明 |
| -------- | -------- | ---- |
| `Reflect.*` (基础方法) | ✅ 原生 ES6 | 对象操作的反射方法 |
| `Reflect.getMetadata()` 等 | ❌ **不是原生** | 由 `reflect-metadata` 库提供 |

### 原生 Reflect API (ES6)

JavaScript 原生 `Reflect` 对象提供以下方法：

```typescript
// 对象操作
Reflect.get(target, key)              // 获取属性
Reflect.set(target, key, value)       // 设置属性
Reflect.has(target, key)              // 检查属性是否存在
Reflect.deleteProperty(target, key)   // 删除属性
Reflect.ownKeys(target)               // 获取所有键

// 函数调用
Reflect.apply(fn, thisArg, args)      // 调用函数
Reflect.construct(Class, args)        // 调用构造函数

// 原型操作
Reflect.getPrototypeOf(target)        // 获取原型
Reflect.setPrototypeOf(target, proto) // 设置原型

// 属性描述符
Reflect.defineProperty(target, key, descriptor)
Reflect.getOwnPropertyDescriptor(target, key)

// 扩展性
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
```

### reflect-metadata 库 (非原生)

`Reflect.getMetadata()` 等元数据方法由 **reflect-metadata** 库提供：

```bash
# NestJS 项目已包含此依赖
pnpm add reflect-metadata
```

```typescript
// 必须先导入！
import 'reflect-metadata';

// 然后才能使用这些方法
Reflect.defineMetadata(key, value, target)           // 定义元数据
Reflect.getMetadata(key, target)                     // 获取元数据
Reflect.hasMetadata(key, target)                     // 检查元数据
Reflect.deleteMetadata(key, target)                  // 删除元数据
Reflect.getMetadataKeys(target)                      // 获取所有元数据键

// 带属性键的版本
Reflect.defineMetadata(key, value, target, propertyKey)
Reflect.getMetadata(key, target, propertyKey)
Reflect.getOwnMetadata(key, target)                  // 仅获取自身的元数据（不含继承）
Reflect.getOwnMetadataKeys(target)
```

### NestJS 中的使用

在 NestJS 项目中，`main.ts` 或入口文件已导入：

```typescript
// src/main.ts
import 'reflect-metadata';  // 扩展 Reflect 对象
```

TypeScript 编译器配合 `emitDecoratorMetadata: true` 会自动生成：

```typescript
// 自动生成的元数据键
'design:type'        // 属性/参数的类型
'design:paramtypes'  // 构造函数/方法的参数类型数组
'design:returntype'  // 方法的返回类型
```

### 完整 API 对比表

| 方法 | 来源 | 用途 |
| ----- | ------ | ----- |
| `Reflect.get()` | 原生 ES6 | 获取对象属性 |
| `Reflect.set()` | 原生 ES6 | 设置对象属性 |
| `Reflect.has()` | 原生 ES6 | 检查属性存在 |
| `Reflect.apply()` | 原生 ES6 | 调用函数 |
| `Reflect.construct()` | 原生 ES6 | 创建实例 |
| `Reflect.defineMetadata()` | reflect-metadata | 定义元数据 |
| `Reflect.getMetadata()` | reflect-metadata | 获取元数据 |
| `Reflect.hasMetadata()` | reflect-metadata | 检查元数据 |
| `Reflect.getMetadataKeys()` | reflect-metadata | 获取所有元数据键 |
| `Reflect.getOwnMetadata()` | reflect-metadata | 获取自身元数据 |

### 为什么需要 reflect-metadata？

**ECMAScript 装饰器提案** 仍在演进中，元数据功能尚未成为标准。`reflect-metadata` 是一个 **polyfill/补丁库**，为 JavaScript 添加了元数据能力：

```typescript
// 没有 reflect-metadata：
Reflect.getMetadata  // ❌ undefined

// 导入后：
import 'reflect-metadata';
Reflect.getMetadata  // ✅ function
```

**未来可能**：如果 [装饰器元数据提案](https://github.com/tc39/proposal-decorator-metadata) 进入 ECMAScript 标准，这些 API 可能会成为原生支持。

---

## 7. 总结

- `@Injectable()` 标记类可被 NestJS IoC 容器管理
- 元数据通过 `reflect-metadata` 库提供的 API 存储和读取（非原生 JS）
- `design:paramtypes` 是实现依赖注入的核心
- TypeScript 编译器自动生成类型元数据
- 可通过 `Reflect.getMetadata()` 查看任何类的元数据（需先导入 reflect-metadata）

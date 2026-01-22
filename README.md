# NestJS 3个月精通学习计划

## 学习者背景

- ✅ 5年 React 开发经验
- ✅ 1年 Ruby on Rails 开发经验
- 🎯 目标：3个月内精通 NestJS

---

## 第一阶段：基础夯实（第1-4周）

### 第1周：NestJS 核心概念

**学习目标：**

- 理解 NestJS 架构和设计哲学
- 掌握 TypeScript 高级特性（装饰器、泛型、类型推断）
- 熟悉依赖注入（DI）和控制反转（IoC）

**学习内容：**

- NestJS CLI 和项目结构
- Controllers、Providers、Modules 三大核心
- 装饰器的工作原理
- 依赖注入容器

#### 练习项目：Todo API

```text
功能：
- CRUD 操作（增删改查）
- 内存数据存储
- RESTful API 设计
- 基本的输入验证

技术栈：
- NestJS 基础
- class-validator
- class-transformer
```

**每日任务：**

- Day 1-2: 搭建环境，学习 NestJS 官方文档 Overview 部分
- Day 3-4: 深入学习 Controllers 和 Providers
- Day 5-6: 实现 Todo API CRUD
- Day 7: 代码重构和单元测试

---

### 第2周：数据持久化与验证

**学习目标：**

- 掌握 TypeORM/Prisma 集成
- 理解实体关系映射
- 精通数据验证和转换管道

**学习内容：**

- TypeORM 基础（推荐，类似 Rails ActiveRecord）
- Entity、Repository 模式
- Pipes 和数据验证
- DTO (Data Transfer Objects)
- Exception Filters

#### 练习项目：博客系统 API

```text
功能：
- 用户注册/登录（暂不加密）
- 文章 CRUD
- 评论功能
- 一对多关系（用户-文章-评论）

数据库：PostgreSQL
技术栈：
- TypeORM
- class-validator
- ValidationPipe
```

**每日任务：**

- Day 1-2: 学习 TypeORM，设计数据模型
- Day 3-4: 实现用户和文章模块
- Day 5-6: 实现评论和关联关系
- Day 7: 添加全局异常处理和验证

---

### 第3周：认证与授权

**学习目标：**

- 实现 JWT 认证机制
- 掌握 Guards 和 策略模式
- 理解中间件和拦截器

**学习内容：**

- Passport.js 集成
- JWT 策略
- Guards (守卫)
- Middleware
- Interceptors
- 角色权限控制（RBAC）

#### 练习项目：完善博客系统

```text
新增功能：
- JWT 认证
- 密码加密（bcrypt）
- 基于角色的访问控制
- 刷新令牌机制
- 用户只能编辑自己的文章

技术栈：
- @nestjs/passport
- @nestjs/jwt
- bcrypt
```

**每日任务：**

- Day 1-2: 实现 JWT 认证
- Day 3-4: 添加 Guards 和权限控制
- Day 5-6: 实现 RBAC 系统
- Day 7: 安全性测试和代码审查

---

### 第4周：高级特性与测试

**学习目标：**

- 掌握测试策略（单元测试、集成测试、E2E测试）
- 理解配置管理
- 学习日志和监控

**学习内容：**

- Jest 单元测试
- E2E 测试
- ConfigModule 配置管理
- Logger 日志系统
- 环境变量管理

#### 练习项目：测试覆盖

```text
任务：
- 为博客系统添加完整测试
- 单元测试覆盖率 > 80%
- E2E 测试主要流程
- 多环境配置（dev/staging/prod）

技术栈：
- Jest
- Supertest
- @nestjs/testing
- @nestjs/config
```

**每日任务：**

- Day 1-2: 学习测试框架，编写服务层单元测试
- Day 3-4: 编写控制器测试和 E2E 测试
- Day 5-6: 配置管理和日志系统
- Day 7: 第一阶段总结和代码重构

---

## 第二阶段：进阶实践（第5-8周）

### 第5周：微服务基础

**学习目标：**

- 理解微服务架构
- 掌握消息队列和事件驱动
- 学习 gRPC 和 TCP 通信

**学习内容：**

- Microservices 模块
- Redis 消息传输
- RabbitMQ 集成
- gRPC 通信
- Event Emitter

#### 练习项目：电商系统（微服务架构）

```text
服务拆分：
1. 用户服务（User Service）
2. 产品服务（Product Service）
3. 订单服务（Order Service）
4. 通知服务（Notification Service）

通信方式：
- HTTP REST
- Redis Pub/Sub
- RabbitMQ 队列

技术栈：
- @nestjs/microservices
- Redis
- RabbitMQ
```

**每日任务：**

- Day 1-2: 设计微服务架构，搭建用户和产品服务
- Day 3-4: 实现订单服务和服务间通信
- Day 5-6: 添加通知服务和消息队列
- Day 7: 服务集成测试

---

### 第6周：实时通信与 WebSocket

**学习目标：**

- 掌握 WebSocket 通信
- 实现实时推送功能
- 理解 Socket.io 集成

**学习内容：**

- Gateway (WebSocket)
- Socket.io
- 实时事件处理
- 房间和命名空间
- WebSocket 认证

#### 练习项目：实时聊天应用

```text
功能：
- 一对一私聊
- 群组聊天
- 在线状态
- 消息历史
- 文件分享
- 输入状态提示

技术栈：
- @nestjs/websockets
- @nestjs/platform-socket.io
- Redis（存储在线用户）
```

**每日任务：**

- Day 1-2: 搭建 WebSocket 网关，实现基础连接
- Day 3-4: 实现私聊和群聊功能
- Day 5-6: 添加消息持久化和在线状态
- Day 7: 性能优化和压力测试

---

### 第7周：GraphQL 与高级查询

**学习目标：**

- 掌握 GraphQL API 开发
- 理解 DataLoader 和 N+1 问题
- 学习 Subscription

**学习内容：**

- GraphQL 基础
- Schema First vs Code First
- Resolvers
- DataLoader
- GraphQL Subscriptions
- Apollo Server

#### 练习项目：社交网络 GraphQL API

```text
功能：
- 用户关注系统
- 动态发布（Feed）
- 点赞和评论
- 实时通知（Subscription）
- 复杂查询优化

技术栈：
- @nestjs/graphql
- Apollo Server
- DataLoader
- GraphQL Subscriptions
```

**每日任务：**

- Day 1-2: 学习 GraphQL，设计 Schema
- Day 3-4: 实现 Query 和 Mutation
- Day 5-6: 优化查询，解决 N+1 问题
- Day 7: 实现 Subscription 实时功能

---

### 第8周：文件处理与任务调度

**学习目标：**

- 掌握文件上传和处理
- 学习定时任务和队列
- 理解后台任务处理

**学习内容：**

- Multer 文件上传
- Stream 流处理
- Bull 队列
- Cron 定时任务
- 图片处理和压缩

#### 练习项目：内容管理系统（CMS）

```text
功能：
- 图片/视频上传
- 文件压缩和处理
- 定时发布内容
- 后台任务队列
- 导出报表（CSV/Excel）
- 邮件发送队列

技术栈：
- Multer
- Sharp（图片处理）
- Bull Queue
- @nestjs/schedule
- AWS S3 / 阿里云 OSS
```

**每日任务：**

- Day 1-2: 实现文件上传和存储
- Day 3-4: 添加图片处理和压缩
- Day 5-6: 实现任务队列和定时任务
- Day 7: 第二阶段总结和性能优化

---

## 第三阶段：高级架构与生产实践（第9-12周）

### 第9周：CQRS 与 Event Sourcing

**学习目标：**

- 理解 CQRS 模式
- 学习事件溯源
- 掌握领域驱动设计（DDD）基础

**学习内容：**

- CQRS 模式
- Event Sourcing
- Saga 模式
- 领域事件
- Read/Write 模型分离

#### 练习项目：银行账户系统

```text
功能：
- 账户开户
- 存款/取款
- 转账（需要分布式事务）
- 交易历史查询
- 账户快照
- 事件回溯

技术栈：
- @nestjs/cqrs
- EventStore / PostgreSQL
- Redis（读模型）
```

**每日任务：**

- Day 1-2: 学习 CQRS，设计命令和查询
- Day 3-4: 实现事件溯源
- Day 5-6: 处理分布式事务（Saga）
- Day 7: 性能测试和优化

---

### 第10周：监控、日志与性能优化

**学习目标：**

- 掌握 APM 工具
- 学习分布式追踪
- 性能调优策略

**学习内容：**

- Prometheus + Grafana
- ELK Stack（日志）
- OpenTelemetry
- 缓存策略
- 数据库查询优化
- 压力测试

#### 练习项目：监控系统集成

```text
任务：
- 为之前的项目添加监控
- 实现分布式追踪
- 日志聚合和分析
- 性能指标收集
- 告警系统

技术栈：
- @nestjs/terminus（健康检查）
- Prometheus
- Grafana
- Winston
- Sentry（错误追踪）
```

**每日任务：**

- Day 1-2: 集成 Prometheus 和 Grafana
- Day 3-4: 实现日志系统和分布式追踪
- Day 5-6: 性能分析和优化
- Day 7: 压力测试和瓶颈分析

---

### 第11周：安全与 DevOps

**学习目标：**

- 掌握安全最佳实践
- 学习 CI/CD 流程
- Docker 和 Kubernetes 部署

**学习内容：**

- 安全头（Helmet）
- CSRF 防护
- 限流和防 DDoS
- Docker 容器化
- Kubernetes 部署
- CI/CD Pipeline

#### 练习项目：生产级部署

```text
任务：
- 完整的安全加固
- Docker 多阶段构建
- K8s 部署配置
- GitHub Actions CI/CD
- 蓝绿部署/金丝雀发布

技术栈：
- Helmet
- Rate Limiting
- Docker
- Kubernetes
- GitHub Actions / GitLab CI
```

**每日任务：**

- Day 1-2: 安全加固和限流
- Day 3-4: Docker 容器化
- Day 5-6: K8s 部署和配置
- Day 7: CI/CD 流程搭建

---

### 第12周：综合项目与面试准备

**学习目标：**

- 整合所有知识点
- 准备技术面试
- 构建个人作品集

#### 综合项目：SaaS 项目管理平台

```text
功能模块：
1. 用户管理（多租户）
2. 项目和任务管理
3. 实时协作（WebSocket）
4. 文件管理
5. 数据报表和分析
6. 通知系统
7. 权限管理（细粒度）
8. API 文档（Swagger）

架构要求：
- 微服务架构
- CQRS + Event Sourcing（核心模块）
- GraphQL + REST 混合
- 实时通信
- 完整的测试覆盖
- 监控和日志
- CI/CD 部署

技术栈（综合）：
- NestJS
- PostgreSQL + Redis
- RabbitMQ
- Docker + K8s
- Prometheus + Grafana
```

**每日任务：**

- Day 1-3: 架构设计和核心功能开发
- Day 4-5: 完善功能和测试
- Day 6: 部署和优化
- Day 7: 文档编写和面试准备

---

## 学习资源推荐

### 官方资源

- 📚 [NestJS 官方文档](https://docs.nestjs.com/)
- 🎥 [NestJS 官方课程](https://courses.nestjs.com/)
- 💬 [NestJS Discord 社区](https://discord.gg/nestjs)

### 推荐书籍

- 《NestJS: Build Efficient, Scalable Node.js Apps》
- 《Domain-Driven Design》（DDD 进阶）
- 《Microservices Patterns》

### 视频课程

- Udemy: "NestJS Zero to Hero"
- YouTube: Marius Espejo NestJS 系列
- 掘金：NestJS 中文教程系列

### 开源项目学习

- [awesome-nestjs](https://github.com/nestjs/awesome-nestjs)
- [realworld](https://github.com/lujakob/nestjs-realworld-example-app)
- [nestjs-boilerplate](https://github.com/brocoders/nestjs-boilerplate)

---

## 每周学习建议

### 时间分配

- 📖 理论学习：30%（每天1-1.5小时）
- 💻 编码实践：50%（每天2-3小时）
- 🔍 代码审查和重构：10%（每周2-3小时）
- 📝 文档和总结：10%（每周1-2小时）

### 学习方法

1. **主动学习**：先看文档，再看源码
2. **实践驱动**：每个概念都要写代码验证
3. **对比学习**：与 Rails 和 React 对比理解
4. **社区参与**：在 Stack Overflow 和 GitHub 提问/回答
5. **代码审查**：学习优秀开源项目的代码

### 里程碑检查点

- ✅ 第4周：能独立开发 RESTful API
- ✅ 第8周：能设计微服务架构
- ✅ 第12周：能构建生产级应用

---

## 从 Rails 迁移到 NestJS 的对应关系

| Ruby on Rails        | NestJS                   |
| -------------------- | ------------------------ |
| Controller           | Controller               |
| Model (ActiveRecord) | Entity + Repository      |
| Service Objects      | Providers/Services       |
| Concerns             | Mixins / Decorators      |
| Middleware           | Middleware / Guards      |
| Filters              | Exception Filters        |
| Jobs (ActiveJob)     | Bull Queue               |
| Mailers              | Email Module             |
| Routes               | Decorators (@Get, @Post) |
| Validations          | class-validator          |
| Serializers          | Interceptors             |

---

## 常见陷阱与注意事项

### 1. 依赖注入

❌ 不要直接 `new` 实例化服务
✅ 通过构造函数注入

### 2. 异步处理

❌ 忘记使用 `async/await`
✅ 所有异步操作都要正确处理

### 3. 装饰器顺序

❌ 装饰器顺序错误会导致功能失效
✅ 从上到下执行，注意顺序

### 4. 模块导入

❌ 循环依赖
✅ 使用 `forwardRef()` 或重构模块

### 5. 错误处理

❌ 不处理异常
✅ 使用 Exception Filters 统一处理

---

## 评估标准

### 初级（第1-4周后）

- ✅ 能搭建基础的 CRUD API
- ✅ 理解 DI 和模块系统
- ✅ 能编写基本的单元测试

### 中级（第5-8周后）

- ✅ 能设计微服务架构
- ✅ 熟练使用 WebSocket 和 GraphQL
- ✅ 能处理复杂的业务逻辑

### 高级（第9-12周后）

- ✅ 能应用 CQRS 和 Event Sourcing
- ✅ 能优化性能和安全
- ✅ 能部署生产级应用

---

## 下一步行动

1. ⭐ **今天就开始**：安装 NestJS CLI

   ```bash
   npm i -g @nestjs/cli
   nest new my-first-project
   ```

2. 📅 **建立日程**：每天固定学习时间

3. 🤝 **找学习伙伴**：加入 NestJS 社区

4. 📊 **跟踪进度**：使用这个 README 打勾完成的任务

5. 🎯 **设置提醒**：每周日回顾和计划下周

---

## 进度追踪

### 第一阶段：基础夯实

- [ ] 第1周：NestJS 核心概念
- [ ] 第2周：数据持久化与验证
- [ ] 第3周：认证与授权
- [ ] 第4周：高级特性与测试

### 第二阶段：进阶实践

- [ ] 第5周：微服务基础
- [ ] 第6周：实时通信与 WebSocket
- [ ] 第7周：GraphQL 与高级查询
- [ ] 第8周：文件处理与任务调度

### 第三阶段：高级架构与生产实践

- [ ] 第9周：CQRS 与 Event Sourcing
- [ ] 第10周：监控、日志与性能优化
- [ ] 第11周：安全与 DevOps
- [ ] 第12周：综合项目与面试准备

---

## 总结

这个学习计划充分利用了你的：

- ✅ **React 经验**：TypeScript、异步编程、组件化思维
- ✅ **Rails 经验**：MVC 架构、ORM、RESTful API 设计

通过12周系统学习，你将：

1. 掌握 NestJS 的核心概念和高级特性
2. 能够设计和实现复杂的后端系统
3. 具备微服务架构和 DevOps 经验
4. 构建出色的个人项目作品集

**记住**：精通不是终点，而是持续学习的过程。完成这个计划后，继续关注 NestJS 的更新，参与开源贡献，不断实践和改进！

加油！🚀

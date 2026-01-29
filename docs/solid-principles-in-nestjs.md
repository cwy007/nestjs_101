# SOLID 原则在 NestJS 中的应用

NestJS 的架构设计天然支持 SOLID 原则。以下是每个原则的说明和示例：

---

## 1. S - 单一职责原则 (Single Responsibility Principle)

> 一个类应该只有一个改变的理由

```typescript
// ✅ 好的做法：每个类只负责一件事
@Injectable()
export class UserService {
  // 只负责用户业务逻辑
  findAll() { return this.users; }
}

@Injectable()
export class EmailService {
  // 只负责发送邮件
  sendWelcomeEmail(user: User) { /* ... */ }
}

// ❌ 不好的做法：一个类做太多事
@Injectable()
export class UserService {
  findAll() { /* ... */ }
  sendEmail() { /* ... */ }  // 不应该在这里
  generateReport() { /* ... */ }  // 不应该在这里
}
```

---

## 2. O - 开放封闭原则 (Open/Closed Principle)

> 对扩展开放，对修改封闭

```typescript
// 定义抽象接口
export interface PaymentStrategy {
  pay(amount: number): Promise<void>;
}

// 通过新增类来扩展，而不是修改现有代码
@Injectable()
export class CreditCardPayment implements PaymentStrategy {
  async pay(amount: number) { /* 信用卡支付 */ }
}

@Injectable()
export class PayPalPayment implements PaymentStrategy {
  async pay(amount: number) { /* PayPal 支付 */ }
}

// 新增支付方式只需新增类，无需修改现有代码
@Injectable()
export class ApplePayPayment implements PaymentStrategy {
  async pay(amount: number) { /* Apple Pay 支付 */ }
}
```

---

## 3. L - 里氏替换原则 (Liskov Substitution Principle)

> 子类必须能够替换其父类

```typescript
// 抽象基类
export abstract class NotificationService {
  abstract send(message: string): Promise<void>;
}

@Injectable()
export class EmailNotification extends NotificationService {
  async send(message: string) {
    // 发送邮件通知
  }
}

@Injectable()
export class SmsNotification extends NotificationService {
  async send(message: string) {
    // 发送短信通知
  }
}

// Controller 可以使用任何 NotificationService 的子类
@Controller('orders')
export class OrderController {
  constructor(private notification: NotificationService) {}

  @Post()
  async create() {
    // notification 可以是 Email 或 SMS，行为一致
    await this.notification.send('订单已创建');
  }
}
```

---

## 4. I - 接口隔离原则 (Interface Segregation Principle)

> 客户端不应该依赖它不需要的接口

```typescript
// ❌ 不好的做法：一个大接口
interface UserOperations {
  create(): void;
  update(): void;
  delete(): void;
  sendEmail(): void;
  generateReport(): void;
}

// ✅ 好的做法：拆分成小接口
interface Creatable {
  create(): void;
}

interface Updatable {
  update(): void;
}

interface Deletable {
  delete(): void;
}

// 类只实现需要的接口
@Injectable()
export class UserService implements Creatable, Updatable {
  create() { /* ... */ }
  update() { /* ... */ }
  // 不需要实现 delete、sendEmail 等
}
```

---

## 5. D - 依赖倒置原则 (Dependency Inversion Principle)

> 高层模块不应该依赖低层模块，两者都应该依赖抽象

NestJS 的依赖注入系统天然支持此原则：

```typescript
// 1. 定义抽象（接口）
export interface IUserRepository {
  findById(id: string): Promise<User>;
  save(user: User): Promise<void>;
}

// 2. 创建 Token
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

// 3. 具体实现
@Injectable()
export class PostgresUserRepository implements IUserRepository {
  async findById(id: string) { /* PostgreSQL 实现 */ }
  async save(user: User) { /* PostgreSQL 实现 */ }
}

@Injectable()
export class MongoUserRepository implements IUserRepository {
  async findById(id: string) { /* MongoDB 实现 */ }
  async save(user: User) { /* MongoDB 实现 */ }
}

// 4. 高层模块依赖抽象，不依赖具体实现
@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: IUserRepository  // 依赖接口
  ) {}
}

// 5. 在 Module 中配置具体实现
@Module({
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: PostgresUserRepository, // 可轻松切换为 MongoUserRepository
    },
  ],
})
export class UserModule {}
```

---

## 总结

| 原则 | NestJS 实践 |
| ------ | ------------- |
| **S** 单一职责 | Controller 处理请求、Service 处理业务、Repository 处理数据 |
| **O** 开放封闭 | 使用策略模式、接口扩展功能 |
| **L** 里氏替换 | 抽象类/接口的多态实现 |
| **I** 接口隔离 | 定义小而专注的接口 |
| **D** 依赖倒置 | 使用 `@Inject()` 注入抽象而非具体实现 |

NestJS 的模块化架构和依赖注入容器使得遵循 SOLID 原则变得非常自然！

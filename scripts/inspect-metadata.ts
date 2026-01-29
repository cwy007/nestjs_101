/**
 * 查看 @Injectable() 装饰器附加的元数据
 *
 * 运行: npx ts-node scripts/inspect-metadata.ts
 */
import 'reflect-metadata';
import { Injectable } from '@nestjs/common';

// 示例：一个简单的依赖
@Injectable()
class LoggerService {
  log(msg: string) {
    console.log(msg);
  }
}

// 示例：有构造函数依赖的服务
@Injectable()
class UserService {
  constructor(private logger: LoggerService) {}
}

// 查看元数据的关键 keys
const METADATA_KEYS = [
  'design:type', // 类型
  'design:paramtypes', // 构造函数参数类型（依赖注入的关键！）
  'design:returntype', // 返回类型
  '__injectable__', // NestJS 标记
];

console.log('='.repeat(60));
console.log('📦 LoggerService 的元数据:');
console.log('='.repeat(60));

METADATA_KEYS.forEach((key) => {
  const value = Reflect.getMetadata(key, LoggerService);
  if (value !== undefined) {
    console.log(`  ${key}:`, value);
  }
});

// 获取所有元数据 keys
const allKeys = Reflect.getMetadataKeys(LoggerService);
console.log('\n  所有元数据 keys:', allKeys);

console.log('\n' + '='.repeat(60));
console.log('📦 UserService 的元数据:');
console.log('='.repeat(60));

METADATA_KEYS.forEach((key) => {
  const value = Reflect.getMetadata(key, UserService);
  if (value !== undefined) {
    console.log(`  ${key}:`, value);
  }
});

// 重点：查看构造函数参数类型
const paramTypes = Reflect.getMetadata('design:paramtypes', UserService);
console.log('\n  🔑 构造函数参数类型 (design:paramtypes):');
if (paramTypes) {
  paramTypes.forEach((type: any, index: number) => {
    console.log(`     参数 ${index}: ${type?.name || type}`);
  });
}

console.log('\n' + '='.repeat(60));
console.log('💡 关键理解:');
console.log('='.repeat(60));
console.log(`
  1. @Injectable() 标记类可被 IoC 容器管理

  2. TypeScript 编译器 + reflect-metadata 自动生成:
     - design:paramtypes: 构造函数参数的类型数组
     - 这就是 NestJS 知道要注入什么依赖的关键！

  3. NestJS 容器启动时:
     - 读取 design:paramtypes 元数据
     - 递归解析所有依赖
     - 按正确顺序创建实例
     - 注入到需要的地方
`);

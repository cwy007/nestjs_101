import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SpelunkerModule } from 'nestjs-spelunker';

interface RouteInfo {
  method: string;
  path: string;
}

type DisplayMode = 'routes' | 'modules' | 'all';

async function showRoutes() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  // 必须先listen才能注册所有路由
  await app.listen(0); // 使用端口0让系统自动分配

  const server = app.getHttpAdapter();
  const instance = server.getInstance();
  const routes: RouteInfo[] = [];

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║                    Application Routes                       ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  // 获取Express路由栈 - 注意是 router 不是 _router
  const lazyRouter = instance._router || instance.router;

  if (lazyRouter && lazyRouter.stack) {
    for (const middleware of lazyRouter.stack) {
      if (middleware.route) {
        // 直接路由
        const route = middleware.route;
        const methods = Object.keys(route.methods)
          .filter(m => route.methods[m])
          .map(m => m.toUpperCase());

        methods.forEach(method => {
          routes.push({
            method,
            path: route.path,
          });
        });
      } else if (middleware.name === 'router' && middleware.handle.stack) {
        // 嵌套路由（控制器路由）
        for (const handler of middleware.handle.stack) {
          if (handler.route) {
            const route = handler.route;
            const methods = Object.keys(route.methods)
              .filter(m => route.methods[m])
              .map(m => m.toUpperCase());

            methods.forEach(method => {
              routes.push({
                method,
                path: route.path,
              });
            });
          }
        }
      }
    }
  }

  if (routes.length === 0) {
    console.log('⚠️  No routes found.\n');
  } else {
    // 按路径和方法排序
    routes.sort((a, b) => {
      if (a.path !== b.path) return a.path.localeCompare(b.path);
      const methodOrder = { GET: 1, POST: 2, PUT: 3, PATCH: 4, DELETE: 5 };
      return (methodOrder[a.method] || 99) - (methodOrder[b.method] || 99);
    });

    // 计算列宽
    const maxMethodLen = Math.max(...routes.map(r => r.method.length), 6);
    const maxPathLen = Math.max(...routes.map(r => r.path.length), 4);

    // 表头
    console.log(`\x1b[1m${'METHOD'.padEnd(maxMethodLen + 2)}PATH\x1b[0m`);
    console.log('─'.repeat(maxMethodLen + maxPathLen + 10));

    // 路由列表
    routes.forEach(route => {
      const methodColor = getMethodColor(route.method);
      const method = `\x1b[${methodColor}m${route.method.padEnd(maxMethodLen)}\x1b[0m`;
      const path = `\x1b[36m${route.path}\x1b[0m`;
      console.log(`  ${method}  ${path}`);
    });

    console.log('\n─────────────────────────────────────────────────────────────');
    console.log(`\x1b[32m✓\x1b[0m Found ${routes.length} route(s)\n`);
  }

  await app.close();
  return routes;
}

async function showModules() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  const tree = SpelunkerModule.explore(app);

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║                  Module Dependencies                        ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  tree.forEach((module, index) => {
    console.log(`${index + 1}. \x1b[1m\x1b[36m${module.name}\x1b[0m`);

    if (module.imports && module.imports.length > 0) {
      console.log('   \x1b[90m├─ Imports:\x1b[0m');
      module.imports.forEach((imp, i) => {
        const isLast = i === module.imports.length - 1;
        const prefix = isLast ? '   │  └─' : '   │  ├─';
        console.log(`${prefix} \x1b[33m${imp}\x1b[0m`);
      });
    }

    if (module.controllers && module.controllers.length > 0) {
      console.log('   \x1b[90m├─ Controllers:\x1b[0m');
      module.controllers.forEach((ctrl, i) => {
        const isLast = i === module.controllers.length - 1 && Object.keys(module.providers).length === 0;
        const prefix = isLast ? '   │  └─' : '   │  ├─';
        console.log(`${prefix} \x1b[32m${ctrl}\x1b[0m`);
      });
    }

    if (Object.keys(module.providers).length > 0) {
      console.log('   \x1b[90m└─ Providers:\x1b[0m');
      const providerNames = Object.keys(module.providers);
      providerNames.forEach((provider, i) => {
        const isLast = i === providerNames.length - 1;
        const prefix = isLast ? '      └─' : '      ├─';
        const providerInfo = module.providers[provider];
        console.log(`${prefix} \x1b[35m${provider}\x1b[0m \x1b[90m(${providerInfo.method})\x1b[0m`);
      });
    }

    console.log('');
  });

  console.log('─────────────────────────────────────────────────────────────');
  console.log(`\x1b[32m✓\x1b[0m Found ${tree.length} module(s)\n`);

  await app.close();
}

function getMethodColor(method: string): number {
  const colors: Record<string, number> = {
    GET: 32,    // 绿色
    POST: 33,   // 黄色
    PUT: 34,    // 蓝色
    PATCH: 35,  // 紫色
    DELETE: 31, // 红色
  };
  return colors[method] || 37; // 默认白色
}

function printUsage() {
  console.log('\n\x1b[1mUsage:\x1b[0m');
  console.log('  npm run routes [mode]\n');
  console.log('\x1b[1mModes:\x1b[0m');
  console.log('  \x1b[32mroutes\x1b[0m   - Show application routes (default)');
  console.log('  \x1b[33mmodules\x1b[0m  - Show module dependencies');
  console.log('  \x1b[36mall\x1b[0m      - Show both routes and modules\n');
  console.log('\x1b[1mExamples:\x1b[0m');
  console.log('  npm run routes');
  console.log('  npm run routes modules');
  console.log('  npm run routes all\n');
}

async function main() {
  const args = process.argv.slice(2);
  const mode = (args[0] || 'routes') as DisplayMode;

  if (args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  if (!['routes', 'modules', 'all'].includes(mode)) {
    console.error(`\x1b[31m❌ Invalid mode: ${mode}\x1b[0m`);
    printUsage();
    process.exit(1);
  }

  try {
    if (mode === 'routes') {
      await showRoutes();
    } else if (mode === 'modules') {
      await showModules();
    } else if (mode === 'all') {
      await showModules();
      console.log(''); // 空行分隔
      await showRoutes();
    }
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();

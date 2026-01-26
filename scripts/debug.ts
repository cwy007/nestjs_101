import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

async function debug() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });

  await app.listen(3001);

  const server = app.getHttpAdapter();
  const instance = server.getInstance();

  console.log('\n=== Debug Info ===');
  console.log('Instance keys:', Object.keys(instance));
  console.log('Has _router:', !!instance._router);

  if (instance._router) {
    console.log('Router stack length:', instance._router.stack?.length);
    instance._router.stack?.forEach((layer, i) => {
      console.log(`\nLayer ${i}:`, {
        name: layer.name,
        hasRoute: !!layer.route,
        hasHandle: !!layer.handle,
        routePath: layer.route?.path,
        routeMethods: layer.route ? Object.keys(layer.route.methods) : null,
      });
    });
  }

  await app.close();
  process.exit(0);
}

debug();
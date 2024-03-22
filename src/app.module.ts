import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { TaskModule } from './task/task.module'

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, TaskModule],
})
export class AppModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { PomodoroService } from './pomodoro.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { PomodoroRoundDto, PomodoroSessionDto } from './dto/pomodoro.dto'

@Controller('user/timer')
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @Get('today')
  @Auth()
  async getTodaySession(@CurrentUser('id') userId: string) {
    return this.pomodoroService.findTodaySession(userId)
  }

  @Post()
  @HttpCode(200)
  @Auth()
  async create(@CurrentUser('id') userId: string) {
    return this.pomodoroService.create(userId)
  }

  @Put('/round/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  async updateRound(@Param('id') id: string, @Body() dto: PomodoroRoundDto) {
    return this.pomodoroService.updateRound(dto, id)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  async update(
    @Body() dto: PomodoroSessionDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.pomodoroService.update(dto, id, userId)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth()
  async removeSession(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.pomodoroService.removeSession(id, userId)
  }
}

import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Server, Socket } from 'socket.io';
import { GetCommentDto } from './dto/get-comment.dto';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common/decorators';
import { DeleteGuard } from './guards/delete.guard';

@WebSocketGateway({
  cors: { credentials: true, origin: ['http://localhost:3000'] },
})
export class CommentsGateway {
  @WebSocketServer()
  private _server: Server;

  constructor(private readonly commentsService: CommentsService) {}

  private parseCookieHeader(cookieHeader) {
    const cookies = {};
    if (cookieHeader) {
      const cookieList = cookieHeader.split(';');
      cookieList.forEach((cookie) => {
        const [name, value] = cookie.trim().split('=');
        cookies[name] = value;
      });
    }
    return cookies;
  }

  @SubscribeMessage('createComment')
  async create(@MessageBody() createCommentDto: CreateCommentDto) {
    /*
      check access-token to get user id
      add to dto
      or client should send it?
    */

    const result = await this.commentsService.create(createCommentDto);
    this._server.emit('createComment', new GetCommentDto(result));
  }

  @SubscribeMessage('removeComment')
  @UseGuards(DeleteGuard)
  async remove(@MessageBody() id: number) {
    await this.commentsService.remove(id);
    this._server.emit('removeComment', id);
  }
}

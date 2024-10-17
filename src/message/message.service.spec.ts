import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './message.service';
import { IMessagesRepository } from './interfaces/IMessagesRepository';
import { Message } from './message.entity';
import { PaginationOptions } from './interfaces/IQuertOptions';

describe('MessagesService', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let messagesRepository: IMessagesRepository;
  let messagesService: MessagesService;

  const mockMessagesRepository = {
    createMessage: jest.fn(),
    getMessagesByRoom: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        { provide: 'IMessagesRepository', useValue: mockMessagesRepository },
      ],
    }).compile();

    messagesService = module.get<MessagesService>(MessagesService);
    messagesRepository = module.get<IMessagesRepository>('IMessagesRepository');
  });

  it('should be defined', () => {
    expect(messagesService).toBeDefined();
  });

  describe('createMessage', () => {
    it('should call createMessage in the repository', async () => {
      const messageContent = 'Hello world!';
      const roomId = 1;
      const userId = 2;
      const mockMessage = {
        id: 1,
        content: messageContent,
        room: { id: roomId },
        user: { id: userId },
      } as Message;

      mockMessagesRepository.createMessage.mockResolvedValue(mockMessage);

      const result = await messagesService.createMessage(
        messageContent,
        roomId,
        userId,
      );

      expect(mockMessagesRepository.createMessage).toHaveBeenCalledWith(
        messageContent,
        roomId,
        userId,
      );
      expect(result).toEqual(mockMessage);
    });
  });

  describe('getMessagesByRoom', () => {
    it('should return paginated messages', async () => {
      const roomId = 1;
      const mockMessages = [
        { id: 1, content: 'Message 1', createdAt: new Date() },
        { id: 2, content: 'Message 2', createdAt: new Date() },
      ] as Message[];
      const mockTotal = 2;

      mockMessagesRepository.getMessagesByRoom.mockResolvedValue({
        data: mockMessages,
        total: mockTotal,
      });

      const options: PaginationOptions = { limit: 10, page: 1, order: 'DESC' };
      const result = await messagesService.getMessagesByRoom(roomId, options);

      expect(mockMessagesRepository.getMessagesByRoom).toHaveBeenCalledWith(
        roomId,
        options,
      );
      expect(result).toEqual({ data: mockMessages, total: mockTotal });
    });
  });

  describe('getMessageById', () => {
    it('should return a message by ID', async () => {
      const messageId = 1;
      const mockMessage = {
        id: messageId,
        content: 'Hello world!',
        room: { id: 1 },
        user: { id: 2 },
      } as Message;

      mockMessagesRepository.findById.mockResolvedValue(mockMessage);

      const result = await messagesService.getMessageById(messageId);

      expect(mockMessagesRepository.findById).toHaveBeenCalledWith(messageId);
      expect(result).toEqual(mockMessage);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn().mockResolvedValue({
              message: 'User registered successfully!',
            }),
            signIn: jest.fn().mockResolvedValue({
              accessToken: 'fake-jwt-token',
            }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('Sign Up', () => {
    it('should return success message on valid sign-up', async () => {
      const dto: SignUpDto = {
        name: 'Aayush Rathore',
        number: '9876543210',
        password: 'Doremon@03',
      };

      const result = await authController.signUp(dto);
      expect(result).toEqual({ message: 'User registered successfully!' });
      expect(authService.signUp).toHaveBeenCalledWith(dto);
    });

    it('should throw error if sign-up fails', async () => {
      jest.spyOn(authService, 'signUp').mockRejectedValue(new Error('User already exists'));

      try {
        await authController.signUp({
          name: 'Aayush',
          number: '9876543210',
          password: '12345',
        });
      } catch (error) {
        expect(error.message).toBe('User already exists');
      }
    });
  });

  describe('Sign In', () => {
    it('should return JWT token on valid login', async () => {
      const dto: SignInDto = {
        number: '9876543210',
        password: 'Doremon@03',
      };

      const result = await authController.signIn(dto);
      expect(result).toEqual({ accessToken: 'fake-jwt-token' });
      expect(authService.signIn).toHaveBeenCalledWith(dto);
    });

    it('should throw error if credentials are incorrect', async () => {
      jest.spyOn(authService, 'signIn').mockRejectedValue(new Error('Invalid credentials'));

      try {
        await authController.signIn({
          number: '9876543210',
          password: 'wrongPassword',
        });
      } catch (error) {
        expect(error.message).toBe('Invalid credentials');
      }
    });
  });
});

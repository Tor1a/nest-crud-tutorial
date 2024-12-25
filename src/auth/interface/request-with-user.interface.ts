import { Request } from 'express';
import { UserEntity } from '../../user/entity/user.entity';

interface RequestWithUserInterface extends Request {
  user: UserEntity;
}

export default RequestWithUserInterface;

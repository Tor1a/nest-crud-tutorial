import { Request } from 'express';
import { User } from '../../user/entity/user.entity';

interface RequestWithUserInterface extends Request {
  user: User;
}

export default RequestWithUserInterface;

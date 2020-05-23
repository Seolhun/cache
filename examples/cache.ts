import Cache from '../src';

interface User {
  id: string;
  name: string;
}

interface CacheProps {
  user: User;
  users: User[];
}

const cache = new Cache<CacheProps>();

export default cache;

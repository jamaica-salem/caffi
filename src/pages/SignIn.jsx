import { Button } from '../reusable/Button';

export const SignIn = () => (
  <div className="max-w-md mx-auto mt-10">
    <h1 className="text-2xl font-bold mb-4 text-brown">Sign In</h1>
    <input className="border p-2 w-full mb-4 rounded" placeholder="Email" />
    <input className="border p-2 w-full mb-4 rounded" placeholder="Password" type="password" />
    <Button label="Sign In" onClick={() => {}} />
  </div>
);

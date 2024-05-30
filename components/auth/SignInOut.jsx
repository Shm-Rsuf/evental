import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInOut = () => {
  const { auth, setAuth } = useAuth();
  const router = useRouter();
  /* handleLogout */
  const handleLogout = () => {
    setAuth(null);
    router.push("/login");
  };

  return (
    <div>
      {auth ? (
        <>
          <span className='mx-2 font-bold text-white capitalize tracking-wider'>
            Hello, {auth?.name}
          </span>
          <span className='mx-1'>|</span>
          <a className='cursor-pointer' onClick={handleLogout}>
            Logout
          </a>
        </>
      ) : (
        <Link href='/login'>Login</Link>
      )}
    </div>
  );
};

export default SignInOut;

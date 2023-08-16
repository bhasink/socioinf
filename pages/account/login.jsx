import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Login;

function Login() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }) {
        return userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            .catch(alertService.error);
    }

    return (
        <Layout>


<section className="loginfoms">
  <div className="maingridml">
    <div className="toplogomns">
      <div className="lgmnos">
        <a className="navbar-brand" href="#">
          <img src="/images/logoadm2.png" className="navbar-brand-img" alt="logo" />
        </a>
      </div>
    </div>
    <div className="col-md-6">
      <div className="formlogs">
        <h1 className="sgupintfs">Sign in to Influencers</h1>
        <p className="smtxs">Please enter your credentials to proceed.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <div className="invalid-feedback">{errors.username?.message}</div>

          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Password</label>
            <input  name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="*******" />
            <div className="invalid-feedback">{errors.password?.message}</div>

          </div>
          {/* <button type="submit" className="btn btn-primary">Sign In</button> */}

          <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                        <Link href="/account/register" className="btn btn-link">Register</Link>
        </form>
      </div>
    </div>
    <div className="col-md-6 rightbannermn">
      <img src="/images/ladymove.jpg" />
    </div>
  </div>
</section>




          
        </Layout>
    );
}

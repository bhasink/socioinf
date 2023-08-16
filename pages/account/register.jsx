import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Register;

function Register() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.register(user)
            .then(() => {
                alertService.success('Registration successful', { keepAfterRouteChange: true });
                router.push('login');
            })
            .catch(alertService.error);
    }

    return (
        <Layout>


<section className="loginfoms signnewusers">
  <div className="maingridml">
    <div className="toplogomns">
      <div className="lgmnos">
        <a className="navbar-brand" href="#">
          <img src="/images/logoadm2.png" className="navbar-brand-img" alt="logo" />
        </a>
      </div>
    </div>

    <div className="col-md-6 rightbannermn">
      <img src="/images/dummybaner.jpg" />
    </div>

    <div className="col-md-6">
      <div className="formlogs">
        <h1 className="sgupintfs">Sign in to Influencers</h1>
        <p className="smtxs">Please enter your credentials to proceed.</p>
      


        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                           
                            <input name="firstName" placeholder ="First Name" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="form-group">
                           
                            <input name="lastName" placeholder ="Last Name" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                        <div className="form-group">
                           
                            <input name="username" placeholder ="Username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>

                       {/* <div className="form-group">
                            <select className='form-control'>
                                <option>What Best Describes you ?</option>
                                <option>Ecommerce</option>
									<option>B2C</option>
									<option>B2B</option>
									<option>Non-profit</option>
									<option>Agency</option>
									<option>Influencer</option>
									<option>Other</option>

                            </select>
                        </div>*/ }


                        <div className="form-group">
                          
                            <input placeholder ="Password" name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group">
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                        </div>
                        <p class="avc">Don't have account ? please <Link href="/account/login" className="lnac"> Login</Link></p>
                    </form>
                    
      </div>
    </div>
    
  </div>
</section>


        </Layout>
    );
}

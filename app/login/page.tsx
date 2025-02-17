import Footer from '@/app/components.v2/footer';
import InvertedHeader from '@/app/components.v2/inverted-header';
import { Metadata } from 'next';
import getPageMeta from '@/lib/get-page-meta';
import LoginForm from '@/app/components.v2/common/login-form';
import LoginWithSocial from '@/app/components.v2/common/login-social';

export const metadata: Metadata = getPageMeta(
  'Login',
  'Make your travel plans easier'
);

const LogIn = () => {
  return (
    <>
      <div className="header-margin" />

      <InvertedHeader />

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-6 col-lg-7 col-md-9">
              <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
                <LoginForm />

                <div className="row y-gap-20 pt-30">
                  <div className="col-12">
                    <div className="text-center">or sign in with</div>
                  </div>
                  <LoginWithSocial />
                  <div className="col-12">
                    <div className="text-center px-30">
                      By creating an account, you agree to our Terms of Service
                      and Privacy Statement.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LogIn;

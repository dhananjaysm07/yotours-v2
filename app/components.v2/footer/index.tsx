import ContactInfo from './contact-info';
import Copyright from './copyrights';
import FooterContent from './footer-content';

const Footer = () => {
  return (
    <footer className="footer -type-1">
      <div className="container">
        <div className="pt-20 pb-20 border-top-light">
          <div className="row justify-between xl:justify-start">
            <div className="col-xl-4 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-10">Contact Us</h5>
              <ContactInfo />
            </div>
            <FooterContent />
          </div>
        </div>
      </div>
      <div className="container-fluid copyrightbg">
        <div className="container">
          <div className="py-10">
            <Copyright />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

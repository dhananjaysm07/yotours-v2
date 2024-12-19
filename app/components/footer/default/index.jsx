import AppButton from "./AppButton";
import ContactInfo from "./ContactInfo";
import Copyright from "./Copyright";
import FooterContent from "./FooterContent";

const index = () => {
  return (
    <footer className="footer -type-1">
      <div className="container">
        <div className="pt-20 pb-20 border-top-light">
          <div className="row justify-between xl:justify-start">
            <div className="col-xl-4 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-10">Contact Us</h5>
              <ContactInfo />
            </div>
            {/* End col */}

            <FooterContent />
            {/* End footer menu content */}

            {/* <div className="col-xl-2 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-30">Mobile</h5>
              <AppButton />
            </div> */}
          </div>
        </div>
        {/* End footer top */}

        {/* End footer-copyright */}
      </div>
      {/* End container */}
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

export default index;

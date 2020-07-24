import React from "react";
import {Button} from "reactstrap";

function Footer(props) {
  return (
    <div id="footer" className="footer footer-1">
      <div className="typo-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="widget">
                <h5 className="widget-title">
                  COMPANY NAME<span></span>
                </h5>
                <p>About the company, little discription will goes here.. </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="widget">
                <h5 className="widget-title">
                  Quick Links<span></span>
                </h5>
                <ul className="list-unstyled">
                  <li>
                    <div>
                      <a href="#.">Home</a>
                    </div>
                  </li>
                  <li>
                    <div>
                      <a href="#.">About us</a>
                    </div>
                  </li>
                  <li>
                    <div>
                      <a href="#.">Contact us</a>
                    </div>
                  </li>
                  <li>
                    <div>
                      <a href="#.">Favorites</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="widget">
                <h5 className="widget-title">
                  Get Started<span></span>
                </h5>
                <p>Get access to your full Training and Marketing Suite.</p>
                <Button outline>Register</Button>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="widget">
                <h5 className="widget-title">
                  Contact Us<span></span>
                </h5>
                <p>
                  <a className="a_color" href="mailto:info@domain.com" title="gloryhole">
                    info@domain.com
                  </a>
                </p>
               <div className="text-center">
                    <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                    <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                    <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                    <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                    <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                    <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p>Copyright Company Name © 2016. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

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
                  REACT BLOG<span></span>
                </h5>
                <p>Here you can write shit about what you like, it's lovely ain't it? </p>
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
                <p>Get full access to view more shit </p>
                <Button outline>Click here baby</Button>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="widget">
                <h5 className="widget-title">
                  Contact Us<span></span>
                </h5>
                <p>
                  <a className="a_color" href="mailto:info@domain.com" title="gloryhole">
                    Spongebob@patrick.com
                  </a>
                </p>
               <div className="text-center">
                    <a className="btn rounded-circle shadow btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                    <a className="btn rounded-circle shadow btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                    <a className="btn rounded-circle shadow btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                    <a className="btn rounded-circle shadow btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                    <a className="btn rounded-circle shadow btn-social-icon" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

import React from "react";

export default function SkillArea() {
  return (
    <>
      <section id="skills" className="skill-area">
        <div className="container">
          <div className="container-inner">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="section-title section-black-title mb-40 wow fadeInUp delay-0-2s">
                  <h2>Professional Skills</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="skill-items-wrap">
                  <div className="row">
                    {/* <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-2s">
                        <img src="assets/images/skills/skill1.png" alt="Skill" />
                        <h5>Figma</h5>
                      </div>
                    </div> */}
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item  wow fadeInUp delay-0-4s">
                        <img
                          src="assets/images/skills/pngwing.com.png"
                          alt="Skill"
                          className="w-50"
                        />
                        <h5>Photoshop</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-3s">
                        <img
                          src="assets/images/skills/pngwing.com (1).png"
                          alt="Skill"
                          className="w-50"
                        />
                        <h5>Premiere Pro</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-4s">
                        <img
                          src="assets/images/skills/logo-c776a2e7.svg"
                          alt="Skill"
                          className="w-50"
                        />
                        <h5>aftershoot</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-5s">
                        <img
                          src="assets/images/skills/Sketch_Logo.svg.png"
                          alt="Skill"
                          className="w-50"
                        />
                        <h5>Sketch</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-3s">
                        <img
                          src="assets/images/skills/pngwing.com (2).png"
                          alt="Skill"
                          className="w-50"
                        />
                        <h5>Tailwand</h5>
                      </div>
                    </div>

                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-5s">
                        <img
                          src="assets/images/skills/images.png"
                          alt="Skill"
                          className="w-50"
                        />
                        <h5>React JS</h5>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6">
                      <div className="skill-item wow fadeInUp delay-0-2s">
                        <img
                          src="assets/images/skills/next-js.svg"
                          alt="Skill"
                          className=" w-50"
                        />
                        <h5>NEXT JS</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

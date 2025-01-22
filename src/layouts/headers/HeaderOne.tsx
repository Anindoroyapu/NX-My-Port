"use client";
import Link from "next/link";
import UseSticky from "@/hooks/UseSticky";
import NavMenu from "./NavMenu";
import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import Logo from "@/assets/images/SignMy@2x.png";
import Image from "next/image";

export default function HeaderOne() {
  const { sticky } = UseSticky();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={`main-header ${sticky ? "fixed-header" : ""}`}>
        <div className="header-upper">
          <div className="container">
            <div className="header-inner">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-md-6 col-6 col-sm-3">
                  <div className="logo-area">
                    <Link href="/">
                      <Image src={Logo} alt="" width={1000} height={40} />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-6 col-6 col-sm-9">
                  <div className="main-menu d-none d-lg-block">
                    <nav id="mobile-menu">
                      <NavMenu />
                    </nav>
                  </div>
                  <div className="side-menu-icon d-lg-none text-end">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpen(!open)}
                      className="info-toggle-btn f-right sidebar-toggle-btn"
                    >
                      <i className="fal fa-bars"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}

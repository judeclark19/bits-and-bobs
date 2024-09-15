"use client";

import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/styles/GlobalStyles";
import Image from "next/image";
import ccLogo from "@/public/cc-logo.png";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <main>{children}</main>
          <footer>
            <div className="top">
              <div>
                A 2023-2024&nbsp;
                <strong>
                  <a href="https://github.com/judeclark19">Code Couture</a>
                </strong>
                &nbsp;creation
              </div>
              <Image
                src={ccLogo}
                alt="Code Couture logo"
                width={20}
                height={20}
              />
              <div>
                Built by
                <strong>
                  &nbsp;
                  <a href="https://github.com/judeclark19/bits-and-bobs/">
                    Jude Clark
                  </a>
                </strong>
              </div>
            </div>
            <div className="bottom">Last updated September 15, 2024</div>
          </footer>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

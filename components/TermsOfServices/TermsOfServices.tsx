/* eslint-disable react/no-unescaped-entities */
import React from 'react';

function TermsOfServices() {
  return (
    <div className="min-h-screen std_padding">
      <div className="flex justify-center pt-[50px] ">
        <h2 className="text-[#FAFAFA] text-[40px] mobile:text-[24px]">
          TERMS & CONDITIONS OF SERVICE
        </h2>
      </div>
      <div className="text-[#FAFAFA] pt-[30px]  uppercase text-[24px] pb-[40px] leading-[29px] mobile:text-[16px] mobile:leading-[24px]  ">
        <p className="text-[#FAFAFA]  ">
          This agreement (the “Agreement”) is between you (the “User”) and the
          online shop (the “Company”) and governs the use of the Company’s
          services. By using the Company’s services, you agree to be bound by
          the terms and conditions of this Agreement.
        </p>
        <p>
          <span className="font-medium"> 1. </span>
          <span className="font-bold">The Service. </span>
          The Company provides a service through which the User can use
          artificial intelligence (“AI”) to generate images and have them
          printed on various products (the “Service”).
        </p>

        <p>
          <span className="font-medium"> 2. </span>
          <span className="font-bold">Intellectual Property. </span>
          All images generated and printed are public domain and not subject to
          copyright. The Company does not claim any ownership, rights or
          interests in any images generated and printed. The Company’s charge
          for the Service is not for the images themselves but for the Service
          of upscaling the images and having them printed on products and
          shipping, etc.
        </p>

        <p>
          <span className="font-medium"> 3. </span>
          <span className="font-bold">Warranty Disclaimer. </span>
          The Service is provided “as is” and without warranty of any kind. The
          Company does not guarantee the accuracy, completeness, or reliability
          of the Service and is not liable for any damages or losses that may be
          incurred in connection with the use of the Service.
        </p>

        <p>
          <span className="font-medium"> 4. </span>
          <span className="font-bold"> Indemnification. </span>
          The User agrees to indemnify and hold the Company harmless from any
          and all claims, demands, losses, liabilities and expenses (including,
          but not limited to, attorney's fees) arising out of the User’s use of
          the Service.
        </p>

        <p>
          <span className="font-medium"> 5. </span>
          <span className="font-bold">Termination. </span>
          The Company reserves the right to terminate the Service at any time
          and without notice.
        </p>

        <p>
          <span className="font-medium"> 6. </span>
          <span className="font-bold">Severability. </span>
          If any provision of this Agreement is held to be invalid or
          unenforceable, it shall be deemed removed from this Agreement, and the
          remaining provisions shall remain in full force and effect.
        </p>
        <p>
          This Agreement constitutes the entire agreement between the User and
          the Company with respect to the use of the Service.
        </p>
        <p>
          By using the Service, the User acknowledges that they have read and
          agree to be bound by the terms of this Agreement.
        </p>
        <p>Last updated: 12/13/22</p>
      </div>
    </div>
  );
}

export default TermsOfServices;

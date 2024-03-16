import Image from "next/image";
import { apple, bill, google } from "../../app/assets";
import styles, { layout } from "../style";

const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <Image src={bill} alt="billing" width={`100%`} height={`100%`} rel={`z-[5]`} className="relative z-[5]" />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Easily control your <br className="sm:block hidden" /> billing &
        invoicing
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Elit enim sed massa etiam. Mauris eu adipiscing ultrices ametodio
        aenean neque. Fusce ipsum orci rhoncus aliporttitor integer platea
        placerat.
      </p>

      <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
        <Image src={apple} alt="google_play" width={`128.86px`} height={`42.05px`} className="object-contain mr-5 cursor-pointer" />
        <Image src={google} alt="google_play" width={`144.17px`} height={`43.08px`} className="object-contain cursor-pointer" />
      </div>
    </div>
  </section>
);

export default Billing;

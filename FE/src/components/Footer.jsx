'use client';
import Link from 'next/link';
import {
  FacebookIcon,
  FooterBackground,
  InstagramIcon,
  LogoIconWhite,
  TwitterIcon,
} from './icons';

const content = {
  '': 'Нүүр',
  contact: 'Холбоо барих',
  'menu?category=0': 'Хоолны цэс',
  termofservice: 'Үйлчилгээний нөхцөл',
  deliveryzone: 'Хүргэлтийн бүс',
  privacypolicy: 'Нууцлалын бодлого',
};

const footerIcons = {
  'https://www.instagram.com/pineconemongolia/': <FacebookIcon />,
  'https://www.facebook.com/pinecone.academy.mongolia/': <InstagramIcon />,
  'https://x.com/i/flow/login?redirect_after_login=%2Fpineconeacademy': (
    <TwitterIcon />
  ),
};

const styles = {
  container:
    'bg-[#18BA51] min-w-[1440px] min-h-[545px] text-white flex items-center justify-center relative overflow-hidden',
  contentContainer: 'flex flex-col items-center gap-10 z-10',
  header: 'flex gap-2 text-[20px] font-bold ',
  text: 'flex justify-between w-full underline underline-offset-4 font-[590]',
  iconsContainer: 'flex gap-[18px] items-center p-[5px]',
  line: 'w-[1200px] h-[1px] bg-white',
  bottomText: 'text-center flex flex-col gap-2 font-normal',
  background: 'absolute top-0',
};

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <LogoIconWhite />
          <p>Food Delivery</p>
        </div>
        <div className={styles.text}>
          {Object.keys(content).map((FooterItems) => (
            <Link href={`/${FooterItems}`}>{content[FooterItems]}</Link>
          ))}
        </div>
        <div className={styles.iconsContainer}>
          {Object.keys(footerIcons).map((icons) => (
            <a target="_blank" href={icons}>
              {footerIcons[icons]}
            </a>
          ))}
        </div>
        <div className={styles.line}></div>
        <div className={styles.bottomText}>
          <p>© 2024 Pinecone Foods LLC </p>
          <p>Зохиогчийн эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
      <div className={styles.background}>
        <FooterBackground />
      </div>
    </div>
  );
};

export default Footer;

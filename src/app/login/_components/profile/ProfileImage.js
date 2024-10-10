import Image from 'next/image';

const ProfileImage = (props) => {
  return <Image src={props.src} alt={props.alt} width={props.width} height={props.height} />;
};
export default ProfileImage;

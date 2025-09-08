import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY!,
  urlEndpoint: "https://ik.imagekit.io/bigwavehaibuithe",
});

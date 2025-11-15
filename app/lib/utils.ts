export const APP_METADATA = {
    title: 'Mini App Template',
    description: 'A demo mini app built on Base',
    imageUrl: 'https://i.imgur.com/2bsV8mV.png',
    splash: {
        imageUrl: 'https://i.imgur.com/brcnijg.png',
        backgroundColor: '#FFFFFF' 
    },
    url: process.env.SITE_URL || 'http://localhost:3000',
    baseBuilder: {
        allowedAddresses: ['0x8342A48694A74044116F330db5050a267b28dD85']
    },
    links: {
        github: 'https://github.com/dylsteck/mini-app-template',
        convexDashboard: 'https://dashboard.convex.dev',
        baseDocs: 'https://docs.base.org/mini-apps',
    }
};

export const getBaseURL = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'http://localhost:3000';
};

export const fcMiniAppEmbed = (title = 'Launch', imageUrl = APP_METADATA.imageUrl, url = APP_METADATA.url) => ({
  version: "next",
  imageUrl,
  button: {
    title,
    action: {
      type: "launch_frame",
      name: APP_METADATA.title,
      url,
      splashImageUrl: APP_METADATA.splash.imageUrl,
      splashBackgroundColor: APP_METADATA.splash.backgroundColor,
    },
  },
});
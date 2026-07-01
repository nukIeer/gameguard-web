import { Package } from './types';

export const packageManifest: { packages: Package[] } = {
  "packages": [
    {
      "id": "roblox",
      "display_name": "Roblox",
      "short_type": "Oyun",
      "icon_type": "gamepad",
      "version_name": "2.xxx.xxxx",
      "file_size": "225 MB",
      "android_min": "8+",
      "updated_label": "Güncel",
      "status": "ready",
      "download_url": "#"
    },
    {
      "id": "discord",
      "display_name": "Discord",
      "short_type": "Sohbet",
      "icon_type": "chat",
      "version_name": "xxx.x",
      "file_size": "120 MB",
      "android_min": "8+",
      "updated_label": "Güncel",
      "status": "ready",
      "download_url": "#"
    }
  ]
};

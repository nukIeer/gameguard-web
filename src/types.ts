export interface Package {
  id: string;
  display_name: string;
  short_type: string;
  icon_type: 'gamepad' | 'chat';
  version_name: string;
  file_size: string;
  android_min: string;
  updated_label: string;
  status: 'ready' | 'unavailable';
  download_url: string;
}

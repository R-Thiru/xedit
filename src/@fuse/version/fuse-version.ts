import { Version } from '@fuse/version/version';
import { environment } from '../../environments/environment'
export const FUSE_VERSION = new Version(environment.version).full;

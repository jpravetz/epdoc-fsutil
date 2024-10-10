import type { Integer } from '@epdoc/typeutil';
import type fs from 'node:fs';

/**
 * Object contains the [fs.Stats](https://nodejs.org/api/fs.html#class-fsstats)
 * for a file. Test if this has been initialized with an `fs.Stats` object by
 * calling FSStats#isInitialized.
 *
 * Contains a number of property methods that do not require asynchronous calls.
 */
export class FSStats {
  public _stats: fs.Stats | undefined;

  constructor(stats?: unknown) {
    if (stats) {
      this._stats = stats as fs.Stats;
    }
  }

  /**
   * Return a copy of this object.
   * @returns
   */
  copy(): FSStats {
    return new FSStats(this._stats);
  }

  /**
   * Test if the stats have been read
   * @returns
   */
  isInitialized(): boolean {
    return this._stats ? true : false;
  }

  /**
   * Clear stats.
   * @returns
   */
  clear(): this {
    this._stats = undefined;
    return this;
  }

  /**
   * Does the file exist? Should be called only after stats have been read.
   * @returns
   */
  exists(): boolean {
    if (this._stats) {
      return this._stats.isDirectory() === true || this._stats.isFile() === true;
    }
    return false;
  }

  isDirectory(): boolean {
    if (this._stats) {
      return this._stats.isDirectory() === true;
    }
    return false;
  }

  isFolder(): boolean {
    return this.isDirectory();
  }

  isDir(): boolean {
    return this.isDirectory();
  }

  isFile(): boolean {
    if (this._stats) {
      return this._stats.isFile() === true;
    }
    return false;
  }

  createdAt(): Date | undefined {
    if (this._stats) {
      return new Date(this._stats.birthtime || this._stats.mtime);
    }
  }

  modifiedAt(): Date | undefined {
    if (this._stats) {
      return new Date(this._stats.mtime);
    }
  }

  get size(): Integer {
    return this._stats ? this._stats.size : -1;
  }
}

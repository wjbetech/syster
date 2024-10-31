import fs from "fs";
import { execSync } from "child_process";

// types for storage data
interface StorageInfo {
  mountPath: string;
  total: string; // in GB
  free: string;
  usage: string; // usage ratio, between 0 and 1
}

// file system & storage
export function getStorageData(): StorageInfo[] {
  const storageData: StorageInfo[] = [];

  if (process.platform === "win32") {
    // Windows: use 'wmic' to get drives
    const drives = execSync("wmic logicaldisk get name").toString().split("\r\r\n");
    drives.forEach((drive) => {
      const path = drive.trim();
      if (path) {
        try {
          const stats = fs.statfsSync(path + "/");
          const total = stats.bsize * stats.blocks;
          const free = stats.bsize * stats.bfree;

          storageData.push({
            mountPath: path,
            total: `${(total / 1_000_000_000).toFixed(2)} GB`,
            usage: `${((total - free) / 1_000_000_000).toFixed(2)} GB`,
            free: `${(free / 1_000_000_000).toFixed(2)} GB`
          });
        } catch (err) {
          console.warn(`Failed to access drive ${path}:`, err);
        }
      }
    });
  } else {
    // Unix-based systems: use 'df' to get mounted filesystems
    const dfOutput = execSync('df -T | grep -E "(ext4|ext3|ext2|xfs|btrfs|apfs|hfs)"').toString();
    const lines = dfOutput.split("\n");

    lines.forEach((line) => {
      const parts = line.split(/\s+/);
      if (parts.length >= 7) {
        // Check to ensure all necessary parts exist
        const mountPath = parts[6];
        const total = parseInt(parts[2]) * 1024; // Total in bytes
        const free = parseInt(parts[4]) * 1024; // Free in bytes

        storageData.push({
          mountPath,
          total: Math.floor(total / 1_000_000_000).toString(), // Convert to GB
          free: Math.floor(free).toString(),
          usage: (1 - free / total).toString()
        });
      }
    });
  }

  return storageData;
}

console.log(getStorageData());

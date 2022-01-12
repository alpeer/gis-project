import { Disk as createDisk, useDisk as createDiskHook } from "@otag/disk"
import { config } from "@utils"

export const Disk = createDisk()

export const useDisk = createDiskHook(Disk)

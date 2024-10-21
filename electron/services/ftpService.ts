import { Client, AccessOptions } from 'basic-ftp';
import * as fs from 'fs';
import * as path from 'path';

interface FtpConfig {
    host: string;
    user: string;
    password: string;
    port: number;
}

let client: Client | null = null;
let lastConfig: AccessOptions | null = null;

export async function connectToFtp(config: FtpConfig) {
    client = new Client();
    client.ftp.verbose = true; // Activa el modo verboso para depuración

    const accessOptions: AccessOptions = {
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        secure: true,
        secureOptions: {
            rejectUnauthorized: false,
        },
    };

    lastConfig = accessOptions;

    try {
        await client.access(accessOptions);

        // Listar el contenido del directorio raíz después de conectarse
        const list = await client.list('/');
        console.log('Contenido del directorio raíz:', list);

        return { success: true, message: 'Conectado al servidor FTP' };
    } catch (error) {
        client = null;
        return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
}


export async function downloadPdfFiles() {
    if (!client) {
        return { success: false, error: 'No hay conexión FTP establecida' };
    }

    const baseDir = path.join('C:', 'dashboard_panel', 'ftp_archivos');
    
    try {
        if (!fs.existsSync(baseDir)) {
            fs.mkdirSync(baseDir, { recursive: true });
        }

        await downloadRecursive('/', baseDir);

        return { success: true, message: 'Descarga completada' };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Error desconocido en la descarga' };
    }
}

async function downloadRecursive(remotePath: string, localPath: string) {
    if (!client) return;

    try {
        const list = await client.list(remotePath);

        for (const item of list) {
            const remoteItemPath = path.join(remotePath, item.name).replace(/\\/g, '/');
            const localItemPath = path.join(localPath, item.name);

            if (item.type === 2) { // Es un directorio
                if (!fs.existsSync(localItemPath)) {
                    fs.mkdirSync(localItemPath, { recursive: true });
                }
                await downloadRecursive(remoteItemPath, localItemPath);
            } else if (item.type === 1 && path.extname(item.name).toLowerCase() === '.pdf') { // Es un archivo PDF
                try {
                    await client.downloadTo(localItemPath, remoteItemPath);
                } catch (downloadError) {
                    console.error(`Error al descargar ${remoteItemPath}:`, downloadError);
                    // Intenta reconectar y volver a intentar la descarga
                    await reconnectAndRetry(localItemPath, remoteItemPath);
                }
            }
        }
    } catch (error) {
        console.error(`Error en downloadRecursive para ${remotePath}:`, error);
        // Intenta reconectar y volver a intentar la operación
        await reconnectAndRetry(localPath, remotePath, true);
    }
}

async function reconnectAndRetry(localPath: string, remotePath: string, isDirectory = false) {
    if (!client || !lastConfig) return;

    try {
        await client.access(lastConfig);
        if (isDirectory) {
            await downloadRecursive(remotePath, localPath);
        } else {
            await client.downloadTo(localPath, remotePath);
        }
    } catch (error) {
        console.error(`Error al reconectar y reintentar para ${remotePath}:`, error);
    }
}

export function closeFtpConnection() {
    if (client) {
        client.close();
        client = null;
    }
}
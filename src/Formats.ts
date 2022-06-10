export type AllowedFormats = 'svg' | 'png' | 'jpg';

export interface MermaidFormat {
    extension: AllowedFormats;
    mime: string;
}

export const formats: MermaidFormat[] = [
    {
        extension: 'svg',
        mime: 'image/svg+xml'
    },
    {
        extension: 'png',
        mime: 'image/png'
    },
    {
        extension: 'jpg',
        mime: 'image/jpeg'
    }
];
const formatMilliseconds = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    const pad = (num: number, size = 2) => num.toString().padStart(size, '0');
    const padMs = (num: number) => num.toString().padStart(3, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${padMs(milliseconds)}`;
}

export default formatMilliseconds
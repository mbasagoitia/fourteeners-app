const getRanges = (peaks) => {
    const ranges = {};
    peaks.forEach((peak) => {
      if (!ranges[peak.range]) {
        ranges[peak.range] = [];
      }
      ranges[peak.range].push(peak);
    });
    return ranges;
};

export default getRanges;  
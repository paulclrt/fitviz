
export type ECGReading = {
  startTime: string;
  averageHeartRate: number;
  resultClassification: string;
  waveformSamples: number[];
  samplingFrequencyHz: string;
  scalingFactor: number;
  numberOfWaveformSamples: number;
  leadNumber: number;
  featureVersion: string;
  deviceName: string;
  firmwareVersion: string;
};

export type ECGResponse = {
  ecgReadings: ECGReading[];
  pagination: {
    afterDate: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    sort: string;
  };
};

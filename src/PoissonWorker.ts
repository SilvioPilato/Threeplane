import PoissonDiskSampling from 'poisson-disk-sampling';
export type PoissonWorkerMessage = {
  points: number[][];
};

onmessage = (event) => {
  const poisson = new PoissonDiskSampling({
    shape: [event.data.xSize, event.data.ySize],
    minDistance: event.data.minDistance,
    tries: 30,
  });

  postMessage(poisson.fill());
};

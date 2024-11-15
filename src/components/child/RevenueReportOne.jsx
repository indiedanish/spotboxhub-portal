import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import useReactApexChart from '../../hook/useReactApexChart';
import ReactApexChart from 'react-apexcharts';

import { getAds } from '../../services/ads.service';

const RevenueReportOne = () => {
  const { paymentStatusChartSeriesThree, paymentStatusChartOptionsThree } = useReactApexChart();

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalDisplayDuration, setTotalDisplayDuration] = useState(0);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const response = await getAds();
      const adsData = response.results || [];

      // Calculate total display duration
      const totalDuration = adsData.reduce((acc, ad) => {
        const adDuration = ad.content.reduce((sum, content) => sum + content.displayDuration, 0);
        return acc + adDuration;
      }, 0);

      setAds(adsData);
      setTotalDisplayDuration(totalDuration);
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="col-xxl-9">
      <div className="card radius-8 border-0">
        <div className="row">
          <div className="col-xxl-6 pe-xxl-0">
            <div className="card-body p-24">
              <h6 className="mb-2 fw-bold text-lg">Revenue Report</h6>
              <ul className="d-flex flex-wrap align-items-center mt-3 gap-3">
                <li className="d-flex align-items-center gap-2">
                  <span className="w-12-px h-12-px radius-2 bg-primary-600" />
                  <span className="text-secondary-light text-sm fw-semibold">
                    Total Display Duration:{" "}
                    <span className="text-primary-light fw-bold">{totalDisplayDuration} seconds</span>
                  </span>
                </li>
              </ul>
              <div className="mt-40">
                <ReactApexChart
                  options={paymentStatusChartOptionsThree}
                  series={paymentStatusChartSeriesThree}
                  type="bar"
                  height={250}
                  id="paymentStatusChart"
                  className="margin-16-minus"
                />
              </div>
            </div>
          </div>
          <div className="col-xxl-6">
            <div className="row h-100 g-0">
              <div className="col-6 p-0 m-0">
                <div className="card-body p-24 h-100 d-flex flex-column justify-content-center border border-top-0">
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                    <div>
                      <span className="mb-12 w-44-px h-44-px text-primary-600 bg-primary-light border border-primary-light-white flex-shrink-0 d-flex justify-content-center align-items-center radius-8 h6 mb-12">
                        <Icon icon="fa-solid:box-open" className="icon" />
                      </span>
                      <span className="mb-1 fw-medium text-secondary-light text-md">
                        Total Screen Time
                      </span>
                      <h6 className="fw-semibold text-primary-light mb-1">{totalDisplayDuration} seconds</h6>
                    </div>
                  </div>
                  <p className="text-sm mb-0">
                    Increase by{" "}
                    <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                      +{ads.length}
                    </span>{" "}
                    this week
                  </p>
                </div>
              </div>
                            <div className="col-6 p-0 m-0">
                                <div className="card-body p-24 h-100 d-flex flex-column justify-content-center border border-top-0 border-start-0 border-end-0">
                                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                        <div>
                                            <span className="mb-12 w-44-px h-44-px text-yellow bg-yellow-light border border-yellow-light-white flex-shrink-0 d-flex justify-content-center align-items-center radius-8 h6 mb-12">
                                                <Icon
                                                    icon="flowbite:users-group-solid"
                                                    className="icon"
                                                />
                                            </span>
                                            <span className="mb-1 fw-medium text-secondary-light text-md">
                                                Total Ads
                                            </span>
                                            <h6 className="fw-semibold text-primary-light mb-1">
                                                {ads.length}
                                            </h6>
                                        </div>
                                    </div>
                                    <p className="text-sm mb-0">
                                        Increase by{" "}
                                        <span className="bg-danger-focus px-1 rounded-2 fw-medium text-danger-main text-sm">
                                            -5k
                                        </span>{" "}
                                        this week
                                    </p>
                                </div>
                            </div>
                            <div className="col-6 p-0 m-0">
                                <div className="card-body p-24 h-100 d-flex flex-column justify-content-center border border-top-0 border-bottom-0">
                                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                        <div>
                                            <span className="mb-12 w-44-px h-44-px text-lilac bg-lilac-light border border-lilac-light-white flex-shrink-0 d-flex justify-content-center align-items-center radius-8 h6 mb-12">
                                                <Icon
                                                    icon="majesticons:shopping-cart"
                                                    className="icon"
                                                />
                                            </span>
                                            <span className="mb-1 fw-medium text-secondary-light text-md">
                                                Total Earning
                                            </span>
                                            <h6 className="fw-semibold text-primary-light mb-1">
                                                $700
                                            </h6>
                                        </div>
                                    </div>
                                    <p className="text-sm mb-0">
                                        Increase by{" "}
                                        <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                                            +1k
                                        </span>{" "}
                                        this week
                                    </p>
                                </div>
                            </div>
                            <div className="col-6 p-0 m-0">
                                <div className="card-body p-24 h-100 d-flex flex-column justify-content-center border border-top-0 border-start-0 border-end-0 border-bottom-0">
                                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                                        <div>
                                            <span className="mb-12 w-44-px h-44-px text-pink bg-pink-light border border-pink-light-white flex-shrink-0 d-flex justify-content-center align-items-center radius-8 h6 mb-12">
                                                <Icon
                                                    icon="ri:discount-percent-fill"
                                                    className="icon"
                                                />
                                            </span>
                                            <span className="mb-1 fw-medium text-secondary-light text-md">
                                                Weekly Screen Time
                                            </span>
                                            <h6 className="fw-semibold text-primary-light mb-1">
                                                36.5 Hours
                                            </h6>
                                        </div>
                                    </div>
                                    <p className="text-sm mb-0">
                                        Increase by{" "}
                                        <span className="bg-success-focus px-1 rounded-2 fw-medium text-success-main text-sm">
                                            +$10k
                                        </span>{" "}
                                        this week
                                    </p>
                                </div>
                            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueReportOne;

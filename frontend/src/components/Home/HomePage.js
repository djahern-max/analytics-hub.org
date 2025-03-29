// components/Home/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import CharityCarousel from './CharityCarousel';
import DashboardPlaceholder from './DashboardPlaceholder';

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            {/* Hero Section */}


            <header className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <div className={styles.heroLeft}>
                            <h1>Simple, privacy-focused analytics with AI insights</h1>
                            <p className={styles.subtitle}>
                                Get actionable intelligence from your website traffic without compromising visitor privacy.
                                No cookies, no tracking across sites, no personal data collection.
                            </p>

                            <div className={styles.cta}>
                                <Link to="/register" className={styles.primaryButton}>Start free trial</Link>
                                <Link to="/demo" className={styles.secondaryButton}>View live demo</Link>
                            </div>

                            <div className={styles.stats}>
                                <div className={styles.stat}>
                                    <strong>100%</strong>
                                    <span>Data ownership</span>
                                </div>
                                <div className={styles.stat}>
                                    <strong>AI-powered</strong>
                                    <span>Actionable insights</span>
                                </div>
                                <div className={styles.stat}>
                                    <strong>GDPR</strong>
                                    <span>Compliant by design</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.heroRight}>
                            <div className={styles.donationStatement}>
                                <h2>
                                    <span className={styles.percent}>100%</span> of <span className={styles.profits}>PROFITS</span> <span className={styles.donated}>DONATED</span>
                                </h2>
                                <p>Every dollar of profit goes directly to these 5 life-changing charities:</p>

                                {/* Just drop in the carousel directly */}
                                <CharityCarousel />
                            </div>
                        </div>


                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className={styles.features}>
                <div className={styles.container}>
                    <h2>Website analytics with a focus on privacy and intelligence</h2>

                    <div className={styles.featureGrid}>
                        <div className={styles.feature}>
                            <h3>Lightweight script</h3>
                            <p>Less than 1KB in size, won't slow down your website or affect your Core Web Vitals scores</p>
                        </div>

                        <div className={styles.feature}>
                            <h3>AI-powered insights</h3>
                            <p>Get recommendations to improve engagement and conversions based on traffic patterns</p>
                        </div>

                        <div className={styles.feature}>
                            <h3>No cookies</h3>
                            <p>No need for cookie banners or consent management</p>
                        </div>

                        <div className={styles.feature}>
                            <h3>Simple to understand</h3>
                            <p>Clean dashboard that anyone on your team can use and understand</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard Preview */}
            <section className={styles.dashboardPreview}>
                <div className={styles.container}>
                    <h2>Clear, intuitive dashboard with AI-powered recommendations</h2>
                    <p>Monitor your website traffic while getting intelligent suggestions to improve performance</p>

                    <div className={styles.imageContainer}>
                        <DashboardPlaceholder />
                        {/* <img src="/images/dashboard-preview.png" alt="Analytics Hub Dashboard" /> */}
                    </div>
                </div>
            </section>





            {/* Mission Section - ADD THIS SECTION HERE */}
            <section className={styles.mission}>
                <div className={styles.container}>
                    <h2>Analytics for Good</h2>
                    <p className={styles.missionStatement}>
                        Analytics Hub is committed to making a positive impact. We donate 100% of our profits to charitable organizations focused on education and child development. From supporting U.S. classrooms through DonorsChoose to helping children in crisis zones with Street Child, every subscription helps build a brighter future for children worldwide.
                    </p>
                    <div className={styles.missionHighlights}>
                        <div className={styles.missionStat}>
                            <span className={styles.missionNumber}>5</span>
                            <span className={styles.missionLabel}>Education charities</span>
                        </div>
                        <div className={styles.missionStat}>
                            <span className={styles.missionNumber}>100%</span>
                            <span className={styles.missionLabel}>Of profits donated</span>
                        </div>
                        <div className={styles.missionStat}>
                            <span className={styles.missionNumber}>20+</span>
                            <span className={styles.missionLabel}>Countries impacted</span>
                        </div>
                    </div>
                    <Link to="/our-mission" className={styles.button}>Learn more about our mission</Link>
                </div>
            </section>
            {/* Pricing Section */}
            <section className={styles.pricing}>
                <div className={styles.container}>
                    <h2>Simple, transparent pricing</h2>
                    <p>Pay only for what you need with no long-term commitments</p>

                    <div className={styles.pricingCards}>
                        <div className={styles.pricingCard}>
                            <h3>Starter</h3>
                            <div className={styles.price}>$9<span>/month</span></div>
                            <ul>
                                <li>Up to 10,000 monthly pageviews</li>
                                <li>Basic AI insights</li>
                                <li>Unlimited websites</li>
                                <li>1 team member</li>
                            </ul>
                            <Link to="/register" className={styles.button}>Get started</Link>
                        </div>

                        <div className={styles.pricingCard}>
                            <h3>Growth</h3>
                            <div className={styles.price}>$19<span>/month</span></div>
                            <ul>
                                <li>Up to 100,000 monthly pageviews</li>
                                <li>Advanced AI recommendations</li>
                                <li>Unlimited websites</li>
                                <li>3 team members</li>
                            </ul>
                            <Link to="/register" className={styles.button}>Get started</Link>
                        </div>

                        <div className={styles.pricingCard}>
                            <h3>Business</h3>
                            <div className={styles.price}>$49<span>/month</span></div>
                            <ul>
                                <li>Up to 1M monthly pageviews</li>
                                <li>Premium AI insights</li>
                                <li>Unlimited websites</li>
                                <li>Unlimited team members</li>

                            </ul>
                            <Link to="/register" className={styles.button}>Get started</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
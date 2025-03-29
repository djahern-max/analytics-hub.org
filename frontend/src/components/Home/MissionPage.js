import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MissionPage.module.css';

const MissionPage = () => {
    return (
        <div className={styles.missionPage}>
            <div className={styles.heroSection}>
                <div className={styles.container}>
                    <h1>Our Mission</h1>
                    <p className={styles.tagline}>
                        Empowering developers with privacy-focused analytics while investing in education for tomorrow's innovators
                    </p>
                </div>
            </div>

            <section className={styles.missionSection}>
                <div className={styles.container}>
                    <div className={styles.missionContent}>
                        <h2>Analytics with Purpose</h2>
                        <p>
                            At Analytics Hub, we believe in the power of data to transform how developers build digital experiences.
                            But we also believe that business can—and should—be a force for good in the world.
                        </p>
                        <p>
                            Our mission is twofold: to provide developers with exceptional, privacy-focused analytics tools
                            that help create better websites and applications, and to direct 100% of our profits toward
                            educational initiatives that nurture the next generation of tech innovators.
                        </p>
                        <p>
                            We've built Analytics Hub on the principle that you shouldn't have to choose between
                            powerful analytics and user privacy. And we've structured our business model to ensure that
                            your subscription directly contributes to educational opportunities for children worldwide.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.twoColumns}>
                <div className={styles.container}>
                    <div className={styles.column}>
                        <h2>Better Analytics, Better Web</h2>
                        <p>
                            We're developers too, and we understand the frustration of making decisions without
                            clear insights. That's why we've built Analytics Hub to provide meaningful,
                            actionable intelligence through:
                        </p>
                        <ul>
                            <li>AI-powered recommendations to improve user engagement</li>
                            <li>Privacy-first data collection that respects your users</li>
                            <li>Lightweight tracking that won't impact site performance</li>
                            <li>Clear, intuitive dashboards that make analysis accessible</li>
                        </ul>
                        <p>
                            Our goal is to give you the tools to understand how people use your digital products,
                            so you can make them even better—all while maintaining the highest standards of user privacy.
                        </p>
                    </div>
                    <div className={styles.column}>
                        <h2>Investing in Tomorrow's Developers</h2>
                        <p>
                            We believe that education is the most powerful investment in our future. That's why
                            100% of our profits go directly to educational charities focused on:
                        </p>
                        <ul>
                            <li>Supporting STEM education in underserved communities</li>
                            <li>Providing educational resources to children in crisis zones</li>
                            <li>Closing the global learning gap</li>
                            <li>Bringing educational opportunities to out-of-school children</li>
                            <li>Equipping classrooms with the technology needed for digital literacy</li>
                        </ul>
                        <p>
                            Through our partnerships with DonorsChoose, Pratham, Luminos Fund, Street Child,
                            and Save the Children, your subscription helps create pathways to education for
                            children who will become the next generation of developers, designers, and digital innovators.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.impactSection}>
                <div className={styles.container}>
                    <h2>Our Impact So Far</h2>
                    <div className={styles.impactStats}>
                        <div className={styles.impactStat}>
                            <span className={styles.impactNumber}>5</span>
                            <span className={styles.impactLabel}>Education charities supported</span>
                        </div>
                        <div className={styles.impactStat}>
                            <span className={styles.impactNumber}>20+</span>
                            <span className={styles.impactLabel}>Countries reached</span>
                        </div>
                        <div className={styles.impactStat}>
                            <span className={styles.impactNumber}>100%</span>
                            <span className={styles.impactLabel}>Profits donated</span>
                        </div>
                    </div>
                    <p className={styles.impactNote}>
                        With every subscription, your analytics needs help fund educational initiatives worldwide.
                    </p>
                </div>
            </section>

            <section className={styles.joinSection}>
                <div className={styles.container}>
                    <h2>Join Us in Making a Difference</h2>
                    <p>
                        By choosing Analytics Hub, you're not just getting a powerful analytics tool—you're
                        helping build a future where more children have access to quality education and the
                        opportunity to become tomorrow's innovators.
                    </p>
                    <div className={styles.cta}>
                        <Link to="/register" className={styles.primaryButton}>Start your free trial</Link>
                        <Link to="/pricing" className={styles.secondaryButton}>View pricing</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MissionPage;
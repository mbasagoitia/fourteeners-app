import { useEffect } from "react";

const TermsOfUse = ({ setTermsOfUseOpen }) => {

    useEffect (() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setTermsOfUseOpen(false);
            }
        };

        const handleOutsideClick = (e) => {
            if (e.target.classList.contains("overlay")) {
                setTermsOfUseOpen(false);
            }
        }
    
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("click", handleOutsideClick);
    
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("click", handleOutsideClick);
        };

    }, [])

    return (
        <div className="terms-of-use">
            <div className="terms-of-use-content">
                <span className="close" style={{color: "black"}} onClick={() => setTermsOfUseOpen(false)}>
                    &times;
                </span>
                <h1 className="text-center">Terms of Use</h1>
                <p>Welcome to Summit Selector! Before using our website/application, please read these Terms of Use carefully. By accessing or using Summit Selector, you agree to be bound by these Terms of Use. If you do not agree to these Terms of Use, please do not use Summit Selector.</p>
                <ol>
                    <li>
                        <strong>Acceptance of Terms</strong>
                        <p>By accessing or using Summit Selector, you agree to be bound by these Terms of Use, as well as any additional terms and conditions that may apply to specific features or services offered through Summit Selector.</p>
                    </li>
                    <li>
                        <strong>User Conduct</strong>
                        <p>You agree to use Summit Selector only for lawful purposes and in accordance with these Terms of Use. You further agree not to:</p>
                        <ul>
                            <li>Use Summit Selector in any way that violates any applicable law or regulation.</li>
                            <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                            <li>Interfere with or disrupt the operation of Summit Selector or the servers or networks connected to Summit Selector.</li>
                            <li>Engage in any conduct that restricts or inhibits any other user from using Summit Selector.</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Intellectual Property</strong>
                        <p>All content on Summit Selector, including text, graphics, logos, images, audio clips, and software, is the property of Summit Selector or its licensors and is protected by copyright and other intellectual property laws. You may not use, reproduce, distribute, or modify any content from Summit Selector without the prior written consent of Summit Selector.</p>
                    </li>
                    <li>
                        <strong>User Content</strong>
                        <p>By submitting any content (including reviews, comments, photos, etc.) to Summit Selector, you grant Summit Selector a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.</p>
                    </li>
                    <li>
                        <strong>Disclaimer of Warranties</strong>
                        <p>Summit Selector is provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. Summit Selector makes no representations or warranties about the accuracy or completeness of the content on Summit Selector or the availability of any features or services offered through Summit Selector.</p>
                    </li>
                    <li>
                        <strong>Limitation of Liability</strong>
                        <p>In no event shall Summit Selector be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or in connection with your use of Summit Selector.</p>
                    </li>
                    <li>
                        <strong>Governing Law</strong>
                        <p>These Terms of Use shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflicts of law principles.</p>
                    </li>
                    <li>
                        <strong>Changes to Terms of Use</strong>
                        <p>Summit Selector reserves the right to modify or update these Terms of Use at any time without prior notice. Your continued use of Summit Selector after any such changes indicates your acceptance of the modified Terms of Use.</p>
                    </li>
                    <li>
                        <strong>Contact Us</strong>
                        <p>If you have any questions about these Terms of Use or the Summit Selector tool/website, please contact me at marika.basagoitia@gmail.com.</p>
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default TermsOfUse;
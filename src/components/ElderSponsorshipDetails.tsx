import React, { useState } from "react";
import { 
  HeartHandshake, 
  Smartphone, 
  Building2, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  Globe2,
  CheckCircle2
} from "lucide-react";
import confetti from "canvas-confetti";
import { DonationRecord } from "../types";

interface ElderSponsorshipDetailsProps {
  onAddDonation?: (donation: DonationRecord) => void;
  onClose?: () => void;
  compact?: boolean;
}

export const ElderSponsorshipDetails: React.FC<ElderSponsorshipDetailsProps> = ({
  onAddDonation,
  onClose,
  compact = false
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showNotifyForm, setShowNotifyForm] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState(50);
  const [currency, setCurrency] = useState<DonationRecord["currency"]>("USD");
  const [method, setMethod] = useState<DonationRecord["method"]>("M-Pesa");
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim() && !donorName.trim()) return;

    const newDonation: DonationRecord = {
      id: `don-${Date.now()}`,
      donorName: donorName || "Anonymous Ubuntu Supporter",
      amount: Number(amount) || 50,
      currency: currency,
      method: method,
      message: reference 
        ? `Ref: ${reference.trim()}${message ? ` • ${message.trim()}` : ""}` 
        : message || "Contribution for rural African elder travel fund",
      date: new Date().toISOString().split("T")[0]
    };

    if (onAddDonation) {
      onAddDonation(newDonation);
    }
    setSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E65100", "#FFB74D", "#4CAF50", "#ffffff"]
      });
    } catch (err) {}
  };

  return (
    <div className="space-y-6 text-[#1A120B]">
      
      {/* Intro Context Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2C1D11] to-[#1A120B] text-white border border-[#5C3A21] shadow-lg">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#E65100] to-[#BF360C] text-white shrink-0 shadow-md">
            <HeartHandshake className="w-5 h-5 text-[#FFB74D]" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base sm:text-lg text-white">
              Official Elder Travel & Sanctuary Fund
            </h4>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/85 font-light leading-relaxed mt-1">
              While all gathering passes are <strong className="text-[#FFB74D] font-bold">100% Free RSVP</strong>, bringing rural indigenous elders across vast African borders requires chartering 4x4 vehicles, cross-border flights, visas, and elder lodging. Direct 100% of your gift through our transparent accounts below.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Direct Payment Methods */}
      <div className={`grid grid-cols-1 ${compact ? "gap-4" : "md:grid-cols-2 gap-5"}`}>
        
        {/* 1. M-PESA PAYBILL (EAST AFRICA / GLOBAL) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#D4A373]/70 shadow-md hover:border-[#E65100] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <div>
                  <h5 className="font-serif font-extrabold text-base text-[#1A120B]">
                    Safaricom M-Pesa Paybill
                  </h5>
                  <span className="text-[10px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Kenya, Tanzania & Regional
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#5C4033] mb-4 font-light">
              Instant mobile transfer through any Safaricom, Vodacom, or Airtel line via Paybill menu.
            </p>

            <div className="space-y-2.5 bg-[#FAF6F0] p-3.5 rounded-xl border border-[#D4A373]/40 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8C5319] font-bold">Business / Paybill:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-[#1A120B]">522522</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("522522", "mpesa-paybill")}
                    className="p-1.5 rounded-lg bg-white border border-[#D4A373] text-[#5C4033] hover:text-[#E65100] transition-colors"
                    title="Copy Paybill Number"
                  >
                    {copiedKey === "mpesa-paybill" ? <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#D4A373]/30 pt-2">
                <span className="text-[#8C5319] font-bold">Account Number:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-[#E65100]">1298440</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("1298440", "mpesa-acc")}
                    className="p-1.5 rounded-lg bg-white border border-[#D4A373] text-[#5C4033] hover:text-[#E65100] transition-colors"
                    title="Copy Account Number"
                  >
                    {copiedKey === "mpesa-acc" ? <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#D4A373]/30 pt-2">
                <span className="text-[#8C5319] font-bold">Account Name:</span>
                <span className="font-medium text-[#1A120B] text-right text-[11px]">
                  SUT Africa (Elder Travel Fund)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#D4A373]/30 text-[11px] text-[#5C4033] flex items-center justify-between">
            <span>Ref: <strong className="text-[#1A120B]">ELDERS</strong></span>
            <span className="text-[#2E7D32] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Official Paybill
            </span>
          </div>
        </div>

        {/* 2. DIRECT BANK WIRE (KCB BANK KENYA) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#D4A373]/70 shadow-md hover:border-[#E65100] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h5 className="font-serif font-extrabold text-base text-[#1A120B]">
                    Bank Wire / Direct EFT
                  </h5>
                  <span className="text-[10px] font-bold text-[#1565C0] bg-[#E3F2FD] px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Domestic & International Wire
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#5C4033] mb-4 font-light">
              Direct account transfer from any African or international commercial bank.
            </p>

            <div className="space-y-2 bg-[#FAF6F0] p-3.5 rounded-xl border border-[#D4A373]/40 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8C5319] font-bold">Bank Name:</span>
                <span className="font-semibold text-[#1A120B]">Kenya Commercial Bank (KCB)</span>
              </div>

              <div className="flex items-center justify-between border-t border-[#D4A373]/30 pt-1.5">
                <span className="text-[#8C5319] font-bold">Account Name:</span>
                <span className="font-semibold text-[#1A120B] text-right text-[11px]">SUT Africa Trust</span>
              </div>

              <div className="flex items-center justify-between border-t border-[#D4A373]/30 pt-1.5">
                <span className="text-[#8C5319] font-bold">Account Number:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-[#1A120B]">1298 4402 9182</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("129844029182", "bank-acc")}
                    className="p-1.5 rounded-lg bg-white border border-[#D4A373] text-[#5C4033] hover:text-[#E65100] transition-colors"
                    title="Copy Account Number"
                  >
                    {copiedKey === "bank-acc" ? <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#D4A373]/30 pt-1.5">
                <span className="text-[#8C5319] font-bold">SWIFT Code:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-[#E65100]">KCBLKENX</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("KCBLKENX", "swift-code")}
                    className="p-1.5 rounded-lg bg-white border border-[#D4A373] text-[#5C4033] hover:text-[#E65100] transition-colors"
                    title="Copy SWIFT Code"
                  >
                    {copiedKey === "swift-code" ? <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#D4A373]/30 pt-1.5">
                <span className="text-[#8C5319] font-bold">Branch:</span>
                <span className="text-[#5C4033] text-[11px]">Kenyatta Avenue Branch, Nakuru</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#D4A373]/30 text-[11px] text-[#5C4033] flex items-center justify-between">
            <span>Currencies: <strong className="text-[#1A120B]">KES, USD, EUR, GBP</strong></span>
            <span className="text-[#1565C0] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Trust Registered
            </span>
          </div>
        </div>

        {/* 3. MTN MOBILE MONEY (WEST & CENTRAL AFRICA) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#D4A373]/70 shadow-md hover:border-[#E65100] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📲</span>
                <div>
                  <h5 className="font-serif font-extrabold text-base text-[#1A120B]">
                    MTN MoMo / Mobile Money
                  </h5>
                  <span className="text-[10px] font-bold text-[#E65100] bg-[#FFF3E0] px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Uganda, Ghana, Rwanda, Cameroon
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#5C4033] mb-4 font-light">
              Direct merchant payment across West and Central Africa to support regional elder caravans.
            </p>

            <div className="space-y-2.5 bg-[#FAF6F0] p-3.5 rounded-xl border border-[#D4A373]/40 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8C5319] font-bold">Merchant ID:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-[#1A120B]">654321</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("654321", "momo-id")}
                    className="p-1.5 rounded-lg bg-white border border-[#D4A373] text-[#5C4033] hover:text-[#E65100] transition-colors"
                  >
                    {copiedKey === "momo-id" ? <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#D4A373]/30 pt-2">
                <span className="text-[#8C5319] font-bold">Payment Reference:</span>
                <span className="font-mono font-bold text-xs text-[#E65100]">SUT-ELDERS</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#D4A373]/30 text-[11px] text-[#5C4033]">
            Dial your national MoMo code (e.g. *165# in UG, *170# in GH) & choose Pay Merchant.
          </div>
        </div>

        {/* 4. EXTERNAL ONLINE CONTRIBUTION LINKS */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#D4A373]/70 shadow-md hover:border-[#E65100] transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                <div>
                  <h5 className="font-serif font-extrabold text-base text-[#1A120B]">
                    Online External Portals
                  </h5>
                  <span className="text-[10px] font-bold text-[#6A1B9A] bg-[#F3E5F5] px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Credit Card & Global Giving
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#5C4033] mb-4 font-light">
              For donors in the international diaspora or organizations using credit card or PayPal:
            </p>

            <div className="space-y-3">
              <a
                href="https://paypal.me/SUTAfricaElders"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#003087]/5 hover:bg-[#003087]/10 border border-[#003087]/30 text-xs font-bold text-[#003087] transition-all group"
              >
                <div className="flex items-center gap-2">
                  <span className="font-extrabold">PayPal Giving Page</span>
                  <span className="text-[10px] text-[#5C4033] font-normal">(paypal.me/SUTAfricaElders)</span>
                </div>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="https://flutterwave.com/pay/sut-africa-elders"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#E65100]/5 hover:bg-[#E65100]/10 border border-[#E65100]/30 text-xs font-bold text-[#BF360C] transition-all group"
              >
                <div className="flex items-center gap-2">
                  <span className="font-extrabold">Flutterwave Africa Portal</span>
                  <span className="text-[10px] text-[#5C4033] font-normal">(Visa, Mastercard, MoMo)</span>
                </div>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#D4A373]/30 text-[11px] text-[#5C4033] flex items-center justify-between">
            <span>Instant secure online receipt</span>
            <span className="text-[#2E7D32] font-bold">256-Bit SSL Encrypted</span>
          </div>
        </div>

      </div>

      {/* NOTIFY SECRETARY FORM (OPTIONAL SUBMISSION) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF8E7] border-2 border-[#D4A373]/60 shadow-sm space-y-4">
        {submitted ? (
          <div className="p-5 text-center space-y-2 bg-[#E8F5E9] rounded-xl border border-[#A5D6A7]">
            <CheckCircle2 className="w-8 h-8 text-[#2E7D32] mx-auto animate-bounce" />
            <h5 className="font-serif font-bold text-base text-[#1A120B]">
              Asante Sana! Transaction Notification Logged
            </h5>
            <p className="text-xs text-[#5C4033]">
              The council secretary has recorded your notification. Your generous contribution directly funds transport for rural village elders.
            </p>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="mt-3 px-5 py-2 rounded-xl bg-[#1A120B] text-white text-xs font-bold"
              >
                Done
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
              <div>
                <h5 className="font-serif font-bold text-sm sm:text-base text-[#1A120B]">
                  Made a Transfer? Let the Council Secretary Know
                </h5>
                <p className="text-xs text-[#5C4033] font-light">
                  Optionally log your M-Pesa or Bank confirmation code so our treasurers can record your gift and award your gratitude certificate.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowNotifyForm(!showNotifyForm)}
                className="px-3.5 py-1.5 rounded-lg bg-[#1A120B] text-[#FFB74D] hover:text-white text-xs font-bold transition-colors shrink-0"
              >
                {showNotifyForm ? "Hide Form" : "+ Record Transfer Ref"}
              </button>
            </div>

            {showNotifyForm && (
              <form onSubmit={handleNotifySubmit} className="space-y-4 pt-3 border-t border-[#D4A373]/40 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#5C4033] mb-1">
                      Your Name or Organization:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amani Odhiambo / Diaspora Circle"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4A373] text-xs text-[#1A120B] focus:outline-none focus:ring-2 focus:ring-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#5C4033] mb-1">
                      Payment Gateway Used:
                    </label>
                    <select
                      value={method}
                      onChange={(e) => setMethod(e.target.value as DonationRecord["method"])}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4A373] text-xs text-[#1A120B] focus:outline-none focus:ring-2 focus:ring-[#E65100]"
                    >
                      <option value="M-Pesa">Safaricom M-Pesa</option>
                      <option value="Direct Bank Wire">KCB Bank Transfer</option>
                      <option value="MTN Mobile Money">MTN Mobile Money</option>
                      <option value="PayPal">PayPal Giving</option>
                      <option value="Flutterwave">Flutterwave</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#5C4033] mb-1">
                      Transaction Code / Reference:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. QKH8374829 or Wire Ref"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4A373] text-xs text-[#1A120B] focus:outline-none focus:ring-2 focus:ring-[#E65100]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#5C4033] mb-1">
                      Amount Contributed:
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as DonationRecord["currency"])}
                        className="w-24 px-2 py-2 rounded-xl bg-white border border-[#D4A373] text-xs text-[#1A120B]"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="KES">KES (Sh)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="NGN">NGN (₦)</option>
                        <option value="ZAR">ZAR (R)</option>
                      </select>
                      <input
                        type="number"
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#D4A373] text-xs text-[#1A120B]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5C4033] mb-1">
                    Blessing or Message for the Elders:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dedicated to safe travel for Kalahari San & Maasai elders"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4A373] text-xs text-[#1A120B]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E65100] to-[#BF360C] text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 hover:scale-105 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Transfer Notice</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

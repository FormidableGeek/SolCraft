
"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bitcoin, Coins, Diamond, ArrowUpDown, Settings2 } from "lucide-react";
import { CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Token {
  value: string;
  label: string;
  ticker: string;
  icon: JSX.Element;
  balance: number;
}

const initialTokens: Token[] = [
  { value: "btc", label: "Bitcoin", ticker: "BTC", icon: <Bitcoin className="h-5 w-5 mr-2 text-orange-400" />, balance: 0.587 },
  { value: "eth", label: "Ethereum", ticker: "ETH", icon: <Coins className="h-5 w-5 mr-2 text-gray-400" />, balance: 12.587 },
  { value: "sol", label: "Solana", ticker: "SOL", icon: <Diamond className="h-5 w-5 mr-2 text-purple-400" />, balance: 120.587 },
  { value: "usdt", label: "Tether", ticker: "USDT", icon: <Coins className="h-5 w-5 mr-2 text-green-500" />, balance: 1234.587 },
];

interface TokenInputSectionProps {
  label: "FROM" | "TO";
  selectedTokenValue: string;
  onTokenChange: (value: string) => void;
  amount: string;
  onAmountChange: (value: string) => void;
  tokens: Token[];
  onPercentageClick: (percentage: number) => void;
  usdValue: string;
}

function TokenInputSection({
  label,
  selectedTokenValue,
  onTokenChange,
  amount,
  onAmountChange,
  tokens,
  onPercentageClick,
  usdValue,
}: TokenInputSectionProps) {
  const selectedTokenDetails = tokens.find(t => t.value === selectedTokenValue);

  return (
    <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="grid grid-cols-3 gap-2 items-end">
        <div className="col-span-2">
          <Select value={selectedTokenValue} onValueChange={onTokenChange}>
            <SelectTrigger className="h-12 text-base bg-background border-input">
              <div className="flex items-center">
                {selectedTokenDetails?.icon}
                <SelectValue placeholder="Select token" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {tokens.map((token) => (
                <SelectItem key={token.value} value={token.value} className="text-base py-2">
                  <div className="flex items-center">
                    {token.icon}
                    <span>{token.label} <span className="text-muted-foreground">({token.ticker})</span></span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.0"
          className="h-12 text-base text-right bg-background border-input"
        />
      </div>
      <div className="flex justify-between items-center mt-1">
        <div className="text-xs text-muted-foreground">
          Balance: {selectedTokenDetails?.balance.toFixed(3)} {selectedTokenDetails?.ticker}
        </div>
        <div className="flex space-x-1">
          {[0.25, 0.5, 1].map((perc) => (
            <Button
              key={perc}
              variant="ghost"
              size="sm"
              onClick={() => onPercentageClick(perc)}
              className="px-2 py-1 h-6 text-xs bg-primary/10 text-primary hover:bg-primary/20"
            >
              {perc === 1 ? "MAX" : `${perc * 100}%`}
            </Button>
          ))}
        </div>
      </div>
      <div className="text-xs text-muted-foreground text-right h-4">
         {amount && parseFloat(amount) > 0 && `≈ $${usdValue}`}
      </div>
    </div>
  );
}

export function SwapForm() {
  const [tokens, setTokens] = useState<Token[]>(initialTokens);
  const [fromToken, setFromToken] = useState(initialTokens[0].value);
  const [toToken, setToToken] = useState(initialTokens[1].value);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [useBundleEngine, setUseBundleEngine] = useState(true);

  // Dummy USD values for display
  const fromUsdValue = (parseFloat(fromAmount || "0") * (123.45 / 0.587)).toFixed(2);
  const toUsdValue = (parseFloat(toAmount || "0") * (123.45 / 0.587)).toFixed(2);


  const handlePercentageClick = (
    percentage: number,
    tokenValue: string,
    setAmount: Dispatch<SetStateAction<string>>
  ) => {
    const tokenDetails = tokens.find(t => t.value === tokenValue);
    if (tokenDetails) {
      setAmount((tokenDetails.balance * percentage).toString());
    }
  };
  
  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);

    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };


  return (
    <>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="font-headline text-xl">Swap</CardTitle>
          <Button variant="ghost" size="icon">
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-4 md:px-6">
        <TokenInputSection
          label="FROM"
          selectedTokenValue={fromToken}
          onTokenChange={setFromToken}
          amount={fromAmount}
          onAmountChange={setFromAmount}
          tokens={tokens}
          onPercentageClick={(p) => handlePercentageClick(p, fromToken, setFromAmount)}
          usdValue={fromUsdValue}
        />

        <div className="flex justify-center -my-3">
          <Button variant="outline" size="icon" className="rounded-full border-2 bg-background hover:bg-muted z-10" onClick={handleSwapTokens}>
            <ArrowUpDown className="h-4 w-4 text-primary" />
          </Button>
        </div>

        <TokenInputSection
          label="TO"
          selectedTokenValue={toToken}
          onTokenChange={setToToken}
          amount={toAmount}
          onAmountChange={setToAmount}
          tokens={tokens}
          onPercentageClick={(p) => handlePercentageClick(p, toToken, setToAmount)}
          usdValue={toUsdValue}
        />

        <Separator />

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Exchange Rate</span>
            <span>1 BTC ≈ 14.2 ETH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Price Slippage</span>
            <span>0.5%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Transaction Fee</span>
            <span>0.0032 BTC ($1.25)</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-muted-foreground">Min Received</span>
            <span>14.1 ETH</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="bundle-engine" className="text-sm font-medium">
              Use Bundle Engine (save gas)
            </Label>
            <Switch
              id="bundle-engine"
              checked={useBundleEngine}
              onCheckedChange={setUseBundleEngine}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Countdown to Next Bundle: Next 1h 11s <br />
            Transactions in current bundle: 1
          </p>
        </div>
      </CardContent>
      <CardFooter className="px-4 md:px-6 pb-6 pt-4">
        <Button size="lg" className="w-full h-12 text-base font-semibold">
          Close
        </Button>
      </CardFooter>
    </>
  );
}

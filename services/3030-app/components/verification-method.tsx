import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "./ui/Icons"

export const VerificationMethod = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Method</CardTitle>
        <CardDescription>
          Select a verification method for your conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Icons.lit className="mb-3 h-6 w-6" />
              Lit Action
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="paypal"
              id="paypal"
              className="peer sr-only"
            />
            <Label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Icons.lit className="mb-3 h-6 w-6" />
              UMA
            </Label>
          </div>
          <div>
            <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
            <Label
              htmlFor="apple"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Icons.apple className="mb-3 h-6 w-6" />
              Blockchain
            </Label>
          </div>
        </RadioGroup>
        <div className="grid gap-2">
          <Label htmlFor="goal_description">Source (API endpoint)</Label>
          <Input
            id="apiEndpoint"
            placeholder="http://example.com/counter"
          // value={form.apiEndpoint}
          // onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="number">Card number</Label>
          <Input id="number" placeholder="" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="month">Value</Label>
            <Input
              id="accessValue"
              placeholder=".counter"
            // value={form.accessValue}
            // onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="goal_description">should be</Label>
            <Select onValueChange={(e) => {
              // handleSelectChange(e, 'condition')
            }}>
              <SelectTrigger id="verification method">
                <SelectValue placeholder="-" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem onChange={() => console.log("e")} value="<">{`<`}</SelectItem>
                <SelectItem value="<=">{`<=`}</SelectItem>
                <SelectItem value="==">{`==`}</SelectItem>
                <SelectItem value=">">{`>`}</SelectItem>
                <SelectItem value=">=">{`>=`}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cvc">Expected</Label>
            <Input
              id="expectedValue"
              placeholder="5"
            // value={form.expectedValue}
            // onChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue</Button>
      </CardFooter>
    </Card>
  )
}
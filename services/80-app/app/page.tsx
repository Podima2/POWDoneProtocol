'use client';
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/toaster"
import bs58 from 'bs58';

import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Icons } from "@/components/ui/Icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RocketIcon } from "@radix-ui/react-icons"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, previousFriday } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useEffect, useState } from 'react';
import { LitAuthClient } from '@lit-protocol/lit-auth-client';
import { ReloadIcon, CopyIcon, ClipboardCopyIcon, ClipboardIcon } from "@radix-ui/react-icons"
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers';
import { defineReadOnly, resolveProperties } from '@ethersproject/properties';

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import {
  LitAbility,
  LitAccessControlConditionResource,
} from '@lit-protocol/auth-helpers';

// @ts-ignore
import { PowDoneSDK } from '../lib/index.browser.js';
import { ethers } from 'ethers';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { PowDoneWallet } from "@/components/PowDoneWallet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

const pdSdk = PowDoneSDK;

const RPC = process.env.RPC ?? 'http://127.0.0.1:8545';


export default function Home() {
  const { width, height } = useWindowSize()

  const [minDate, setMinDate] = useState('');

  const [authClient, setAuthClient] = useState<LitAuthClient>();
  const [authMethod, setAuthMethod] = useState<any>(null);
  const [litNodeClient, setLitNodeClient] = useState<LitNodeClient>();
  const [profile, setProfile] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pkpWallet, setPkpWallet] = useState<any>(null);
  const [date, setDate] = useState<any>()
  const [error, setError] = useState<any>(null);
  const [isAuthMethodLoaded, setIsAuthMethodLoaded] = useState(false);
  const [taskIsSet, setTaskIsSet] = useState(false);
  const [taskList, setTaskList] = useState<any>();
  const [inProgress, setInProgress] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);

  const [CURRENT_PAGE, setPage] = useState('MAIN');
  const [targetAddress, setTargetAddress] = useState('0xCc4d28dD63Bb58540EeBDD713073Ad1Da1aFd18D');

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setPage(savedPage);
    }
  }, []);


  useEffect(() => {

    if (taskIsSet) {
      setTimeout(() => {
        setTaskIsSet(false)
      }, 8000)
    }

  }, [taskIsSet])

  const [form, setForm] = useState({
    goalDescription: "",
    verificationMethod: "0",
    apiEndpoint: "",
    accessValue: "",
    condition: "",
    expectedValue: "",
    stake: "",
    date: "",
  });

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: any, id: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
  };

  const handleReset = () => {
    setForm({
      goalDescription: "",
      verificationMethod: "0",
      apiEndpoint: "",
      accessValue: "",
      condition: "",
      expectedValue: "",
      stake: "",
      date: "",
    });
  };

  useEffect(() => {

    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // format date as "yyyy-mm-dd"
    setMinDate(dateString);

    setAuthClient(new LitAuthClient({
      litRelayConfig: {
        relayApiKey: '67e55044-10b1-426f-9247-bb680e5fe0c8',
      }
    }));

    setLitNodeClient(new LitNodeClient({
      litNetwork: 'serrano',
      debug: false,
    }));

  }, []);

  useEffect(() => {
    const authMethodLoader = async () => {
      if (isAuthMethodLoaded) return;
      setLoading(true);

      // console.log("loading auth...");
      const url = new URL(window.location.href);

      // 1. we look for the id_token in browser address bar
      const idToken = url.searchParams.get('id_token');

      if (idToken && authClient) {
        setLogged(true);
        console.log("getting auth method");

        // @ts-ignore

        // 2. we authenticate with google access token that we got from the address bar
        const provider = authClient?.initProvider('google');
        const litAuthMethod = await provider?.authenticate();
        console.log("auth method", litAuthMethod);
        setAuthMethod(litAuthMethod);
        console.log("authMethod set!")

        // 3. we use the auth method to fetch a list of PKPs associated with this auth method
        // check if user has pkps
        const pkps = await provider.fetchPKPsThroughRelayer(litAuthMethod);

        // mint one if not
        if (pkps.length <= 1) {
          console.log("no pkps found, minting...");

          // mint a pkp

          // 4. we will mint a PKP for this auth method if none exists
          const tx = await provider.mintPKPThroughRelayer(litAuthMethod);
          console.log("tx", tx);

          // 5. we fetch again to see if there are any PKPs associated with this auth method
          const pkps = await provider.fetchPKPsThroughRelayer(litAuthMethod);
          console.log("pkps", pkps);
          return;
        }

        // we use the first PKP
        const profile = pkps[0]; // index 0
        console.log("profile", profile);
        setProfile(profile);

        // 6. we use the PKP public key AND the auth method to get session signatures
        // get sessionsigs
        if (!session) {
          console.log("getting session sigs")
          // let sessionSigs: any = [JSON.parse(window.localStorage.getItem('lit-session-sigs') as any)];
          let sessionSigs: any = null;

          if (!sessionSigs) {
            try {
              sessionSigs = await provider.getSessionSigs({
                pkpPublicKey: profile.publicKey,
                authMethod: litAuthMethod,
                sessionSigsParams: {
                  chain: 'ethereum', // default EVM chain unless other chain
                  resourceAbilityRequests: [
                    {
                      resource: new LitAccessControlConditionResource('*'),
                      ability: LitAbility.PKPSigning,
                    },
                  ],
                },
              });

              // store session sigs in local storage
              const string = JSON.stringify(sessionSigs);
              console.log("session sigs", string)

            } catch (e) {
              setError(JSON.stringify(e));
              setLoading(false);
              setLogged(false);
              return;
            }
          } else {
            console.log("session sigs found in local storage")
          }

          console.log('sessionSigs', sessionSigs);
          setSession(sessionSigs);
        }

        // 7. use the PKP public key and session signatures to create a PKP Ethers wallet
        console.log('connecting pkp wallet');
        const pkpWallet = new PKPEthersWallet({
          pkpPubKey: profile.publicKey,
          rpc: RPC,
          controllerSessionSigs: session,
          debug: true,
        });

        await pkpWallet.init();

        setPkpWallet(pkpWallet);

        setIsAuthMethodLoaded(true);
      }
      setLoading(false);
    };

    // Load immediately
    authMethodLoader();

    // Then load every second
    const intervalId = setInterval(authMethodLoader, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [authClient, isAuthMethodLoaded]);


  async function connectAuthMethod() {

    if (profile && session) {
      console.log("authMethod already set!");
      console.log(authMethod)
      return;
    }

    // @ts-ignore
    const provider = authClient?.initProvider('google');

    // @ts-ignore
    await provider?.signIn();
  }

  function shortenEthAddress(address: string) {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  const mediumProps = {
    force: 0.6,
    duration: 2500,
    particleCount: 100,
    width: 1000,
    colors: ['#9A0023', '#FF003C', '#AF739B', '#FAC7F3', '#F7DBF4'],
  };

  async function fetchTasks(address = "0xCc4d28dD63Bb58540EeBDD713073Ad1Da1aFd18D") {
    console.warn("fetching tasks...");
    const provider = new ethers.providers.JsonRpcProvider(RPC);
    const randomWallet = ethers.Wallet.createRandom();
    const privateKey = randomWallet.privateKey;
    const wallet = new ethers.Wallet(privateKey, provider);

    const tasks = await pdSdk.getTasks(
      wallet,
      address
    );

    console.log('tasks', tasks);

    if (tasks.length > 0) {

      let _taskList = [];

      for (let i = 0; i < tasks.length; i++) {
        let item = tasks[i];

        let method;
        let material;

        if (parseInt(item[1]) === 0) {
          method = 'Lit Action'

          try {
            // Convert Hex to Buffer
            const buffer = Buffer.from(item[2].replace('0x', ''), 'hex');

            // Encode Buffer to Base58
            const ipfsHash = bs58.encode(buffer);

            console.log("ipfsHash:", ipfsHash)

            material = ipfsHash
          } catch (e) {
            material = 'N\A'
          }

          // convert from hex to string
          // material = Buffer.from(material, 'hex').toString('utf8');

        } else {
          method = 'UMA';
        }

        const task = {
          id: i,
          description: item[0],
          verificationMethod: method,
          verificationMaterial: material,
          verificationAddress: item[3],
          stake: parseInt(item[4]),
          achieved: item[5],
          verified: item[6],
          givenUp: item[7],
          evidence: item[8],
          deadline: new Date(parseInt(item[9]) * 1000).toLocaleString(),
        }

        _taskList.push(task);
      }


      // reverse array
      _taskList = _taskList.reverse();

      console.log("_taskList:", _taskList)

      setTaskList(_taskList);
    }
  }

  async function verifyTask(task: any) {
    console.warn("verifying task");
    console.log(task);
  }

  async function markDone(task: any) {
    console.warn("marking it as done!");
    console.log(task);

    const markdoneTx = await pdSdk.markDone({
      taskIndex: task.id,
      ipfsId: task.verificationMaterial,
      // litClient: litNodeClient,
      // wallet: pkpWallet,
      // pkpPublicKey: profile.publicKey,
      // sessionSigs: session,
    });

    console.log('markdoneTx', markdoneTx);

  }

  return (
    <div>

      {
        taskIsSet ? <Confetti
          initialVelocityY={100}
          style={{ position: 'fixed', bottom: 0, left: 0, zIndex: 100 }}
        /> : ''
      }


      {
        error ?
          <div className="flex w-full justify-center">
            <div className="w-[650px] m-auto mt-12 fixed z-50 top-0">
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            </div>
          </div>
          : ''
      }

      <Toaster />

      {/* wrapper */}
      <div className="min-h-screen py-2 bg-gray-900 text-white">

        {/* <Profile /> */}


        <div className="flex justify-center">

          {
            // Logged In
            logged ?
              <div className="mt-4">
                {
                  (loading && !profile && !session) ? <div className="flex items-center space-x-2">
                    <ReloadIcon className="h-4 w-4 animate-spin" />
                    <div>Using Google Credential...</div>
                  </div> : ''
                }
                {
                  (!loading && !profile && !session) ? <div className="flex items-center space-x-2">
                    <ReloadIcon className="h-4 w-4 animate-spin" />
                    <div>Getting PKP Profile...</div>
                  </div> : ''
                }
                {
                  (profile && !session) ? <div className="flex items-center space-x-2">
                    <ReloadIcon className="h-4 w-4 animate-spin" />
                    <div>Getting PKP Session Keys...</div>
                  </div> : ""
                }
              </div>
              :

              // Not Logged In
              loading && !authMethod ?
                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <ReloadIcon className="h-4 w-4 animate-spin" />
                    <div>Connecting to Lit Protocol...</div>
                  </div>
                </div> : ''
          }
        </div>

        {/* header */}
        <div className="w-full sticky top-0 bg-gray-900 bg-opacity-0 py-4 backdrop-blur-md z-10 fixed px-12">
          <div className="max-w-7xl mx-auto flex">

            {
              false ? <>
                {!authClient ? '❌authClient not set' : '✅auth client set'}<br />
                {!authMethod ? '❌authMethod not set' : '✅authmethod set'}<br />
                {!litNodeClient ? '❌litNodeClient not set' : '✅litNodeClient set'}<br />
                {!pkpWallet ? '❌pkpWallet not set' : '✅pkpWallet set'}<br />
                {!profile ? '❌profile not set' : '✅profile set'}<br />
                {!session ? '❌session not set' : '✅session set'}<br />
                {!loading ? '❌not loading' : '✅is loading'}<br />
                {!logged ? '❌not logged' : '✅is logged'}<br />
              </> : <></>
            }

            {
              false ? <>
                <div className="bg-black">
                  <p style={{ color: 'white' }}>{JSON.stringify(form, null, 2)}</p>
                </div>
              </> : <></>
            }
            {/* navigations */}

            <div className="w-[500px] ml-auto flex justify-end">

              {/* <button onClick={connectAuthMethod} className={`bg-gradient-to-r from-green-700 to-blue-700 rounded-lg text-white px-5 py-2.5 border-0 cursor-pointer text-sm font-bold capitalize ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                Sign In 1
              </button> */}

              <button onClick={() => {
                const page = 'VIEW_TASKS';
                setPage(page);
                localStorage.setItem('currentPage', page); // Save current page to localStorage
                fetchTasks();
              }} className={`hover:bg-gradient-to-r from-red-700 to-yellow-700 rounded-lg text-white px-5 py-2.5 border-0 cursor-pointer text-sm font-bold capitalize mr-4 ${CURRENT_PAGE === 'VIEW_TASKS' ? 'bg-gradient-to-r' : ''}`}>
                View Tasks
              </button>

              {/* <button onClick={() => {
                const page = 'FAUCET';
                setPage(page);
                localStorage.setItem('currentPage', page); // Save current page to localStorage
              }} className={`hover:bg-gradient-to-r from-red-700 to-yellow-700 rounded-lg text-white px-5 py-2.5 border-0 cursor-pointer text-sm font-bold capitalize mr-4 ${CURRENT_PAGE === 'FAUCET' ? 'bg-gradient-to-r' : ''}`}>
                Faucet
              </button> */}

              <button onClick={() => {
                const page = 'MAIN';
                setPage(page);
                localStorage.setItem('currentPage', page); // Save current page to localStorage
              }} className={`hover:bg-gradient-to-r from-red-700 to-yellow-700 rounded-lg text-white px-5 py-2.5 border-0 cursor-pointer text-sm font-bold capitalize mr-4 ${CURRENT_PAGE === 'MAIN' ? 'bg-gradient-to-r' : ''}`}>
                Home
              </button>

              {
                // logged
                logged ?
                  <div className="">
                    <DropdownMenu>
                      <DropdownMenuTrigger className={`bg-gradient-to-r from-green-700 to-blue-700 rounded-lg text-white px-5 py-2.5 border-0 cursor-pointer text-sm font-bold ml-auto capitalize ${!profile || !session ? 'opacity-50 pointer-events-none' : ''}`}>
                        {
                          profile && session ? `${shortenEthAddress(profile.ethAddress)}` : "Sign In"
                        }
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>
                          Copy Address
                          {
                            profile && session ?
                              <button onClick={() => {
                                navigator.clipboard.writeText(profile.ethAddress);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                              }}>
                                {copied ? <ClipboardCopyIcon className="h-4 w-4 inline-block ml-2" /> : <CopyIcon className="h-4 w-4 inline-block ml-2" />}
                              </button> : null
                          }

                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem> */}
                        <DropdownMenuItem onClick={() => { location.reload(); }}>Logout</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  :

                  // not logged
                  <button onClick={connectAuthMethod} className={`bg-gradient-to-r from-green-700 to-blue-700 rounded-lg text-white px-5 py-2.5 border-0 cursor-pointer text-sm font-bold ml-4 capitalize ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                    Sign In
                  </button>
              }
            </div>



          </div>
        </div>
        {/* header! */}

        {
          CURRENT_PAGE === 'MAIN' ?
            <div className="mx-auto mt-12">

              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl mb-6 text-center relative">
                Proof of Work
                <span className="relative inline-block px-4">
                  Done
                  <span className="block h-2 mt-0.5 bg-gradient-to-r from-green-700 to-blue-700"></span>
                </span>
                Protocol
              </h1>


              <div className="text-lg text-center mb-4 max-w-lg m-auto">
                Together, we inspire and hold each other accountable. If a goal isn't met, the 🍬 candies set aside are distributed amongst our supportive community.
              </div>

              {/* <button onClick={async () => {
          // @ts-ignore
          const provider = authClient?.initProvider('webauthn');

          // @ts-ignore
          const authMethod = await provider?.register();

          // @ts-ignore
          const txHash = await provider.verifyAndMintPKPThroughRelayer(authMethod);

          console.log('txHash', txHash);

          console.log('provider', provider);
        }}>Login</button> */}


              {/* <div className="w-full max-w-md mb-4 m-auto">
            <div className="text-sm mb-2">Your Progress:</div>
            <div className="bg-gray-700 rounded h-4">
              <div className="bg-blue-500 h-4" style={{ width: `${progress}%` }}></div>
            </div>
          </div> */}

              {/* Achievement badges */}
              {/* <div className="mb-4 flex space-x-2 items-center justify-center">
          <span className="inline-block p-2 bg-yellow-600 rounded">🥇 First Goal Met</span>
          <span className="inline-block p-2 bg-yellow-600 rounded">🚀 5 Goals Achieved</span>
        </div> */}

              <Card className={`w-[650px] m-auto mt-12 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                <CardHeader>
                  <CardTitle>🚀 LFG!</CardTitle>
                  <CardDescription>Unlock your potential and realise your goal</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">

                      {/* goal description */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl">💡 I'm going to...</CardTitle>
                          <Textarea id="goalDescription"
                            placeholder="eg. I'm going to post 3 times a day on Lens protocol!"
                            value={form.goalDescription}
                            onChange={handleInputChange} />

                          <CardTitle className="text-xl">by</CardTitle>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>🏴‍☠️ Pick a deadline</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(e) => {
                                  if (e) {
                                    const date = new Date(e);
                                    const timestamp = Math.floor(date.getTime() / 1000);
                                    setDate(e);
                                    handleSelectChange(timestamp, 'date')
                                  }
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </CardHeader>
                      </Card>

                      {/* stake */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl">🍬🍭🍫 Stake</CardTitle>
                          <CardDescription>
                            Choose an amount that you're not willing to lose!! If you don't meet your goal, this amount will be distributed amongst the community.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">

                          <div className="grid gap-2">
                            <Label htmlFor="goal_description">Stake ($POWD)</Label>
                            <Input
                              id="stake"
                              placeholder="eg. 100"
                              value={form.stake}
                              onChange={handleInputChange}
                            />
                          </div>

                        </CardContent>
                        {/* <CardFooter>
                      <Button className="w-full">Continue</Button>
                    </CardFooter> */}
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl">Verification Method</CardTitle>
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
                                disabled
                                value="paypal"
                                id="paypal"
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor="paypal"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <RocketIcon className="mb-3 h-6 w-6" />                            UMA
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem disabled value="apple" id="apple" className="peer sr-only" />
                              <Label
                                htmlFor="apple"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <Icons.logo className="mb-3 h-6 w-6" />
                                Blockchain
                              </Label>
                            </div>
                          </RadioGroup>

                          {/* tabs */}
                          <Tabs defaultValue="account" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="account">Recommended</TabsTrigger>
                              <TabsTrigger disabled value="password">Advanced</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Commitment</CardTitle>
                                  <CardDescription>
                                    A set of conditions you're committing to meet in order to achieve your goal.
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  <div className="space-y-1">
                                    <Label htmlFor="goal_description">Source (API endpoint)</Label>
                                    <Input
                                      id="apiEndpoint"
                                      placeholder="eg. http://example.com/counter"
                                      value={form.apiEndpoint}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                      <div className="grid gap-2">
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <div className="flex justify-start gap-1">
                                                <Label htmlFor="month">Value</Label>
                                                <Icons.q />
                                              </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>The 'Access Value' represents the pathway to retrieve a specific value within a nested object. </p>
                                              <p>If the object is {`{ counter: 1 }`}, you use the notation '.counter' to access the value.</p>
                                              <p>For a more complex, nested object like {`{ counter: { click: 1 } }`}, you would access the value with '.counter.click'.</p>

                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>

                                        <Input
                                          id="accessValue"
                                          placeholder="eg. .counter"
                                          value={form.accessValue}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="goal_description">should be</Label>
                                        <Select onValueChange={(e) => {
                                          handleSelectChange(e, 'condition')
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
                                          placeholder="eg. 5"
                                          value={form.expectedValue}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                                {/* <CardFooter>
                              <Button>Save changes</Button>
                            </CardFooter> */}
                              </Card>
                            </TabsContent>
                            <TabsContent value="password">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Password</CardTitle>
                                  <CardDescription>
                                    Change your password here. After saving, you'll be logged out.
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  <div className="space-y-1">
                                    <Label htmlFor="current">Current password</Label>
                                    <Input id="current" type="password" />
                                  </div>
                                  <div className="space-y-1">
                                    <Label htmlFor="new">New password</Label>
                                    <Input id="new" type="password" />
                                  </div>
                                </CardContent>
                                <CardFooter>
                                  <Button>Save password</Button>
                                </CardFooter>
                              </Card>
                            </TabsContent>
                          </Tabs>
                        </CardContent>
                        {/* <CardFooter>
                      <Button className="w-full">Continue</Button>
                    </CardFooter> */}
                      </Card>

                      <Separator />

                      {
                        inProgress ? <>
                          <div className="">

                            <div className="flex justify-center">
                              <div className="m-auto flex">
                                {
                                  !step2
                                    ? <ReloadIcon className="my-auto mr-2 h-4 w-4 animate-spin" />
                                    : <div className="mr-2">✅</div>
                                }

                                <div className="my-auto">
                                  <div className="text-sm">Creating Lit Action</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-center">
                              <div className="m-auto flex">
                                {
                                  !step3
                                    ? <ReloadIcon className="my-auto mr-2 h-4 w-4 animate-spin" />
                                    : <div className="mr-2">✅</div>
                                }
                                <div className="my-auto">
                                  <div className="text-sm">Pinning Lit Action</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-center">
                              <div className="m-auto flex">
                                {
                                  !step4
                                    ? <ReloadIcon className="my-auto mr-2 h-4 w-4 animate-spin" />
                                    : <div className="mr-2">✅</div>
                                }
                                <div className="my-auto">
                                  <div className="text-sm">Mint, Grant, Burn!</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-center">
                              <div className="m-auto flex">
                                {
                                  !step5
                                    ? <ReloadIcon className="my-auto mr-2 h-4 w-4 animate-spin" />
                                    : <div className="mr-2">✅</div>
                                }
                                <div className="my-auto">
                                  <div className="text-sm">Setting task on Goal contract</div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </> : ''
                      }

                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => {
                    handleReset();
                  }}>Reset</Button>
                  <Button onClick={async () => {
                    const _url = new URL(window.location.href);
                    const mock = _url.searchParams.get('mock');
                    console.log("mock:", mock);
                    setInProgress(true);

                    if (mock === 'true') {
                      const provider = new ethers.providers.JsonRpcProvider(RPC);
                      const mockWallet = new ethers.Wallet("1fb5f740d0d3d81fab6d8e5d757c868c48dbd8b7c595982f38c9f8b4cfbf12ab", provider);

                      console.log("address:", mockWallet.address);
                      // mockWallet.litNodeClientReady = true;

                      const date = new Date('2023-09-25T23:00:00.000Z');
                      const timestamp = Math.floor(date.getTime() / 1000);

                      // 2. create lit action code to upload to ipfs
                      console.warn("2. create lit action code to upload to ipfs")
                      const actionCode = pdSdk.createLitAction({
                        api: 'https://api2.powdone.com/counter',
                        accessValue: ".counter",
                        condition: ">=",
                        expectedValue: "5"
                      });

                      console.log("actionCode:", actionCode);

                      // 3. upload to ipfs
                      console.warn("3. upload to ipfs")
                      const mockIpfsRes = await pdSdk.uploadLitAction(actionCode);

                      console.log("mockIpfsRes:", mockIpfsRes)

                      // 6. record the burnt pkp address and ipfs hash in the goal contract
                      const _setTaskTx = await pdSdk.setTask(mockWallet, {
                        description: "MOCK DESCRIPTION",
                        verificationMethod: "0",
                        messageHash: mockIpfsRes.ipfsHex, // ipfs hash
                        burntPKPAddress: mockWallet.address, // response from mint grant burn
                        stake: 555,
                        duration: timestamp,
                      });

                      console.log("_setTaskTx", _setTaskTx);
                      return;
                    }

                    console.log("Setting goal...");

                    if (!profile || !session) {
                      toast({
                        title: "🚩 Authentication Error",
                        description: "Please sign in first",
                      })
                      return;
                    }

                    const errors: any = [];

                    Object.keys(form).forEach((key) => {
                      // @ts-ignore
                      if (!form[key]) {
                        errors.push(key);
                        return;
                      }
                    });

                    if (errors.length > 0) {
                      toast({
                        title: "🚩 ERROR",
                        description: errors.join(', ') + " are required",
                      })
                      return;
                    }

                    // 1. setup pkp wallet
                    console.warn("1. setup pkp wallet")
                    const pdWallet = new PowDoneWallet({
                      pkpPubKey: profile.publicKey,
                      controllerSessionSigs: session,
                      // controllerAuthSig: session[0],
                      debug: false,
                    });

                    await pdWallet.init();

                    console.log("pdWallet:", pdWallet);

                    // 2. create lit action code to upload to ipfs
                    console.warn("2. create lit action code to upload to ipfs")
                    const actionCode = pdSdk.createLitAction({
                      // api: 'https://api2.powdone.com/counter',
                      api: form.apiEndpoint,
                      accessValue: form.accessValue,
                      condition: form.condition,
                      expectedValue: form.expectedValue
                    });

                    console.log("actionCode:", actionCode);

                    if (actionCode) {
                      setStep2(true);
                    }

                    // 3. upload to ipfs
                    console.warn("3. upload to ipfs")
                    const { ipfsId, url, ipfsHash, ipfsHex } = await pdSdk.uploadLitAction(actionCode);

                    console.log("ipfsId", ipfsId);
                    console.log("url", url);
                    console.log("ipfsHash", ipfsHash);
                    console.log("ipfsHex", ipfsHex);

                    if (ipfsId && url && ipfsHash && ipfsHex) {
                      setStep3(true);
                    }

                    // 4. pass the ipfs hash to the mintGrantBurn function in the pkp nft contract using our google auth method pkp wallet
                    console.warn("4. pass the ipfs hash to the mintGrantBurn function in the pkp nft contract using our google auth method pkp wallet")
                    let mintGrantBurn;

                    try {
                      mintGrantBurn = await pdSdk.permitPKPToUseLitAction(
                        pdWallet,
                        ipfsId
                      );
                    } catch (e) {
                      console.log(e);
                      return;
                    }

                    if (mintGrantBurn) {
                      setStep4(true);
                    }

                    // 5. get the burnt pkp address from the response
                    console.warn("5. get the burnt pkp address from the response:", mintGrantBurn);

                    // 6. record the burnt pkp address and ipfs hash in the goal contract
                    console.warn("6. record the burnt pkp address and ipfs hash in the goal contract")

                    try {
                      const setTaskTx = await pdSdk.setTask(pdWallet, {
                        description: form.goalDescription,
                        verificationMethod: form.verificationMethod,
                        messageHash: ipfsHex, // ipfs hash
                        burntPKPAddress: mintGrantBurn.pkp.ethAddress, // response from mint grant burn
                        stake: form.stake,
                        duration: form.date
                      });

                      console.log("setTaskTx", setTaskTx);
                      setTaskIsSet(true);
                      setStep5(true);
                      setInProgress(false);
                    } catch (e) {
                      toast({
                        title: "🚩 ERROR",
                        description: JSON.stringify(e),
                      })
                      return;
                    }

                  }}>Set Goal</Button>

                </CardFooter>
              </Card>

            </div> : ''
        }

        {
          CURRENT_PAGE === 'VIEW_TASKS' ?
            <>
              <div className="mx-auto mt-12">

                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl mb-6 text-center relative">
                  <span className="relative inline-block px-4">
                    View Tasks
                    <span className="block h-2 mt-0.5 bg-gradient-to-r from-green-700 to-blue-700"></span>
                  </span>
                </h1>


                <div className="text-lg text-center mb-4 max-w-lg m-auto">
                  Here are a list of tasks that you can verify! Anyone can approve a task, but only the first person to do so will receive the reward!!🍬🍭🍫
                </div>

                <div className="w-[650px] m-auto mt-12">

                  <div className="flex">
                    <Input
                      defaultValue={targetAddress}
                      onChange={(e) => {
                        setTargetAddress(e.target.value);
                      }}
                      className="m-auto max-w-sm text-black" type="address" placeholder="address" />
                  </div>

                  <div className="flex">
                    <Button className={`m-auto mt-2 bg-gradient-to-r from-green-700 to-blue-700 rounded-lg text-white px-5 py-2.5 border-0 cursor-pointer text-sm font-bold ml-auto capitalize`} onClick={() => {
                      fetchTasks(targetAddress);
                    }}>Update</Button>
                  </div>

                </div>
                <div className="w-full px-20 m-auto mt-12">
                  {
                    (taskList?.length <= 0) || (!taskList) ? <span className="w-full flex justify-center">No tasks found</span> :
                      <>
                        {taskList?.map((task: any, index: number) => (
                          <div key={index} className="flex">
                            <div className="w-full bg-white mb-4 p-6 rounded-lg shadow-lg overflow-hidden border border-gray-200">
                              <h2 className="text-2xl font-semibold mb-4 text-gray-800">{task.description}</h2>
                              <div className="grid grid-cols-2 gap-6">
                                <div>
                                  <p className="font-medium text-gray-600">Verification Method:</p>
                                  <p className="text-gray-800">{task.verificationMethod}</p>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-600">Verification Address:</p>
                                  <p className="text-gray-800">{task.verificationAddress}</p>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-600">Verification Material:</p>
                                  <p className="text-gray-800">{task.verificationMaterial}</p>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-600">Stake:</p>
                                  <p className="text-gray-800">{task.stake}</p>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-600">Achieved:</p>
                                  <p className="text-gray-800">{task.achieved ? '🎉' : 'Working🏗️'}</p>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-600">Verified:</p>
                                  <p className="text-gray-800">{task.verified ? '✅' : '❌'}</p>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-600">Given Up:</p>
                                  <p className="text-gray-800">{task.givenUp ? '🏳️' : 'Nope! 💪'}</p>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-600">Evidence:</p>
                                  <p className="text-gray-800">{task.evidence}</p>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-600">Deadline:</p>
                                  <p className="text-gray-800">{task.deadline}</p>
                                </div>
                              </div>
                            </div>


                            <div className="flex w-[200px] ml-4">
                              <div className="m-auto">
                                <div className="flex">
                                  <Button onClick={() => {
                                    verifyTask(task);
                                  }} className="m-auto bg-gradient-to-r from-green-700 to-blue-700 rounded-lg text-white px-5 py-2.5 border-0 cursor-pointer text-sm font-bold capitalize">
                                    {/* <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> */}
                                    Verify
                                  </Button>
                                </div>
                                <div className="flex mt-2">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button className="m-auto bg-gradient-to-r from-green-700 to-blue-700 rounded-lg text-white px-5 py-2.5 border-0 cursor-pointer text-sm font-bold capitalize">
                                        {/* <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> */}
                                        Mark as Achieved!
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>🎉 Oh wow! Congratulation!</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Once you've marked this task as achieved, other users would be able to verify your achievement via the verification method you've set. Once verified, you will get your stake back and a reward of 10% of the total stake of this task.
                                          <br /><br />
                                          However, if you fail to meet your goal, your stake will be distributed amongst the community.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={(e) => {
                                          e.preventDefault();
                                          markDone(task);
                                        }}>Confirm</AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>

                                </div>

                              </div>
                            </div>

                          </div>
                        ))}
                      </>
                  }


                </div>


              </div>
            </>
            : ''
        }

        {
          CURRENT_PAGE === 'FAUCET' ? 'unavailable' : ''
        }
      </div>
    </div>

  );
}


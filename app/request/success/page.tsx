"use client";

import { useEffect, useState } from "react";
import AppNavbar from "@/components/flow/AppNavbar";
import SuccessSummary from "@/components/flow/SuccessSummary";
import EmptyState from "@/components/flow/EmptyState";
import Footer from "@/components/Footer";
import { SubmittedRequest, REQUEST_KEY } from "@/components/flow/RequestForm";

export default function SuccessPage() {
  const [request, setRequest] = useState<SubmittedRequest | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(REQUEST_KEY);
      if (stored) {
        setRequest(JSON.parse(stored));
      }
    } catch {}
    setLoaded(true);
  }, []);

  return (
    <>
      <AppNavbar />
      <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          {loaded && !request ? (
            <EmptyState
              icon="🔍"
              title="No request found"
              description="We couldn't find a recent request. It may have expired or been cleared. Start a new request by browsing properties."
              action={{ label: "Browse properties", href: "/properties" }}
            />
          ) : loaded && request ? (
            <SuccessSummary request={request} />
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
